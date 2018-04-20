/*!
 * Copyright(c) 2018 Jan Blaha
 *
 * Extension capable of planning reoccurring jobs which are printing specified templates into reports.
 */
const parseCron = require('./parseCron')
const JobProcessor = require('./jobProcessor')
const moment = require('moment')
const nanoid = require('nanoid')

class Scheduling {
  constructor (reporter, definition) {
    this.reporter = reporter
    this.definition = definition

    this.ScheduleType = this.reporter.documentStore.registerEntityType('ScheduleType', {
      _id: {type: 'Edm.String', key: true},
      cron: {type: 'Edm.String'},
      name: {type: 'Edm.String'},
      templateShortid: {type: 'Edm.String'},
      creationDate: {type: 'Edm.DateTimeOffset'},
      nextRun: {type: 'Edm.DateTimeOffset'},
      shortid: {type: 'Edm.String'},
      enabled: {type: 'Edm.Boolean'},
      modificationDate: {type: 'Edm.DateTimeOffset'},
      state: {type: 'Edm.String'}
    })

    this.TaskType = this.reporter.documentStore.registerEntityType('TaskType', {
      _id: {type: 'Edm.String', key: true},
      scheduleShortid: {type: 'Edm.String'},
      creationDate: {type: 'Edm.DateTimeOffset'},
      finishDate: {type: 'Edm.DateTimeOffset'},
      state: {type: 'Edm.String'},
      error: {type: 'Edm.String'},
      ping: {type: 'Edm.DateTimeOffset'}
    })

    this.reporter.documentStore.registerEntitySet('schedules', {
      entityType: 'jsreport.ScheduleType',
      humanReadableKey: 'shortid'
    })

    this.reporter.documentStore.model.entityTypes['ReportType'].taskId = {type: 'Edm.String'}
    this.reporter.documentStore.registerEntitySet('tasks', {entityType: 'jsreport.TaskType'})

    reporter.initializeListeners.add(definition.name, this, () => this._initialize())

    this.reporter.on('express-configure', (app) => {
      app.get('/api/scheduling/nextRun/:cron', (req, res) => {
        try {
          const cron = parseCron(req.params.cron, {
            currentDate: new Date()
          })

          try {
            res.send(cron.next().toDate())
          } catch (e) {
            res.send(new Date(0))
          }
        } catch (e) {
          res.status(500).send('invalid cron pattern, ' + e.message)
        }
      })

      app.post('/api/scheduling/runNow', (req, res) => {
        reporter.documentStore.collection('schedules').find({
          _id: req.body.scheduleId
        }).then((schedule) => {
          if (schedule.length === 0) {
            return Promise.reject(new Error('can\'t find a schedule with id ' + req.body.scheduleId))
          }

          return reporter.scheduling.jobProcessor.execute(schedule[0], null, true)
        }).then(() => {
          res.status(200).end()
        }).catch((err) => {
          res.status(500).end(err.message)
        })
      })
    })
  }

  _updateNextRun (entity) {
    let cron

    try {
      cron = parseCron(entity.cron, {
        currentDate: new Date()
      })

      entity.nextRun = cron.next().toDate()

      cron = parseCron(entity.cron, {
        currentDate: new Date(entity.nextRun.getTime() + 1000)
      })
    } catch (e) {
      throw new Error('invalid cron pattern, ' + e.message)
    }

    const intervalMS = cron.next().toDate().getTime() - entity.nextRun.getTime()

    if (intervalMS < this.definition.options.minScheduleInterval) {
      throw new Error('Minimal interval for schedule is ' + moment.duration(this.definition.options.minScheduleInterval).humanize() +
        '. You are trying to set ' + moment.duration(intervalMS - 10000).humanize())
    }
  }

  _beforeCreateHandler (entity) {
    entity.shortid = entity.shortid || nanoid(7)

    if (!entity.cron) {
      throw new Error('cron expression must be set.')
    }

    entity.state = 'planned'
    entity.creationDate = new Date()
    entity.modificationDate = new Date()
    entity.enabled = entity.enabled !== false // default false
    this._updateNextRun(entity)

    if (entity.enabled !== false && !entity.templateShortid) {
      throw new Error('Enabled schedules needs to include template')
    }
  }

  _beforeUpdateHandler (query, update) {
    const entity = update.$set

    // only update for updates from ui
    if (entity.name && entity.state) {
      entity.modificationDate = new Date()
      this._updateNextRun(entity)
      entity.state = 'planned'

      if (entity.enabled !== false && !entity.templateShortid) {
        throw new Error('Enabled schedules needs to include template')
      }

      if (!entity.cron) {
        throw new Error('cron expression must be set.')
      }
    }
  }

  _initialize () {
    this.schedulesCollection = this.reporter.documentStore.collection('schedules')
    this.schedulesCollection.beforeInsertListeners.add('schedule', this._beforeCreateHandler.bind(this))
    this.schedulesCollection.beforeUpdateListeners.add('schedule', this._beforeUpdateHandler.bind(this))
  }

  stop () {
    this.jobProcessor.stop()
  }

  start () {
    this.jobProcessor.start()
  }

  renderReport (schedule, task) {
    return this.reporter.render({
      template: {shortid: schedule.templateShortid},
      context: { user: {isAdmin: true} },
      options: {
        scheduling: {taskId: task._id.toString(), schedule: schedule},
        reports: {save: true, mergeProperties: {taskId: task._id.toString()}}
      }
    })
  }
}

module.exports = function (reporter, definition) {
  if (definition.options.enabled === false) {
    return
  }

  reporter.scheduling = new Scheduling(reporter, definition)

  definition.options = Object.assign({
    interval: 5000,
    maxParallelJobs: 5,
    minScheduleInterval: 60000
  }, definition.options)

  reporter.scheduling.jobProcessor = new JobProcessor(reporter.scheduling.renderReport.bind(reporter.scheduling), reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, definition.options)

  if (definition.options.autoStart !== false) {
    reporter.initializeListeners.add('scheduling', function () {
      reporter.scheduling.start()
    })
  }
}
