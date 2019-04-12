/*!
 * Copyright(c) 2018 Jan Blaha
 *
 * Extension capable of planning reoccurring jobs which are printing specified templates into reports.
 */
const parseCron = require('./parseCron')
const JobProcessor = require('./jobProcessor')
const moment = require('moment')

class Scheduling {
  constructor (reporter, definition) {
    this.reporter = reporter
    this.definition = definition

    this.beforeProcessJobListeners = reporter.createListenerCollection()

    this.ScheduleType = this.reporter.documentStore.registerEntityType('ScheduleType', {
      cron: {type: 'Edm.String'},
      name: {type: 'Edm.String', publicKey: true},
      templateShortid: {type: 'Edm.String'},
      nextRun: {type: 'Edm.DateTimeOffset'},
      enabled: {type: 'Edm.Boolean'},
      state: {type: 'Edm.String'}
    })

    this.TaskType = this.reporter.documentStore.registerEntityType('TaskType', {
      scheduleShortid: {type: 'Edm.String'},
      finishDate: {type: 'Edm.DateTimeOffset'},
      state: {type: 'Edm.String'},
      error: {type: 'Edm.String'},
      ping: {type: 'Edm.DateTimeOffset'}
    })

    this.reporter.documentStore.registerEntitySet('schedules', {
      entityType: 'jsreport.ScheduleType'
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
          res.status(400).send('invalid cron pattern, ' + e.message)
        }
      })

      app.post('/api/scheduling/runNow', async (req, res) => {
        try {
          const schedule = await reporter.documentStore.collection('schedules').find({
            _id: req.body.scheduleId
          }, req)

          if (schedule.length === 0) {
            res.status(404).end(`can't find a schedule with id ${req.body.scheduleId}`)
            return
          }

          await reporter.scheduling.jobProcessor.execute(schedule[0], null, req, true)

          res.status(200).end()
        } catch (err) {
          res.status(500).end(err.message)
        }
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
      throw this.reporter.createError('invalid cron pattern', {
        statusCode: 400,
        original: e
      })
    }

    const intervalMS = cron.next().toDate().getTime() - entity.nextRun.getTime()

    if (intervalMS < this.definition.options.minScheduleInterval) {
      throw this.reporter.createError(`Minimal interval for schedule is ${
        moment.duration(this.definition.options.minScheduleInterval).humanize()
      }. You are trying to set ${moment.duration(intervalMS - 10000).humanize()}`, {
        statusCode: 400
      })
    }
  }

  _beforeCreateHandler (entity) {
    if (!entity.cron) {
      throw this.reporter.createError('cron expression must be set', {
        statusCode: 400
      })
    }

    entity.state = 'planned'
    entity.enabled = entity.enabled !== false // default false
    this._updateNextRun(entity)

    if (entity.enabled !== false && !entity.templateShortid) {
      throw this.reporter.createError('Enabled schedules needs to include template', {
        statusCode: 400
      })
    }
  }

  async _beforeUpdateHandler (query, update, opts, req) {
    const entity = update.$set

    // only update for updates from ui
    if (entity.name && entity.state) {
      this._updateNextRun(entity)
      entity.state = 'planned'

      if (entity.enabled !== false && !entity.templateShortid) {
        throw this.reporter.createError('Enabled schedules needs to include template', {
          statusCode: 400
        })
      }

      if (!entity.cron) {
        throw this.reporter.createError('cron expression must be set', {
          statusCode: 400
        })
      }
    }

    if (entity.enabled === true) {
      // update next run if schedule is enabled,
      // this prevents generating a lot of tasks when the schedule was disabled and re-enabled after for some time
      const scheds = await this.reporter.documentStore.collection('schedules').find(query, req)

      scheds.forEach((sched) => {
        if (sched.enabled === true) {
          // don't do nothing if the schedule enabled is not changed to different value
          return
        }

        const currentCron = entity.cron != null ? entity.cron : sched.cron

        entity.cron = currentCron

        this._updateNextRun(entity)
      })
    } else if (entity.enabled === false) {
      // remove tasks if schedule is disabled,
      // this allows the schedule to start clean again with no previous/pending tasks
      const scheds = await this.reporter.documentStore.collection('schedules').find(query, req)

      await Promise.all(scheds.map(async (sched) => {
        if (sched.enabled === false) {
          // don't do nothing if the schedule enabled is not changed to different value
          return
        }

        await this.reporter.documentStore.collection('tasks').remove({
          state: 'running',
          scheduleShortid: sched.shortid
        }, req)
      }))
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
      template: {
        shortid: schedule.templateShortid
      },
      context: { user: { isAdmin: true } },
      options: {
        scheduling: {taskId: task._id.toString(), schedule: schedule},
        reports: {save: true, mergeProperties: { taskId: task._id.toString() }}
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

  reporter.scheduling.jobProcessor = new JobProcessor({
    beforeProcessJobListeners: reporter.scheduling.beforeProcessJobListeners,
    executionHandler: reporter.scheduling.renderReport.bind(reporter.scheduling),
    documentStore: reporter.documentStore,
    logger: reporter.logger,
    TaskType: reporter.scheduling.TaskType,
    Request: reporter.Request,
    options: definition.options
  })

  if (definition.options.autoStart !== false) {
    reporter.initializeListeners.add('scheduling', () => {
      reporter.scheduling.start()
    })
  }

  reporter.closeListeners.add('scheduling', () => reporter.scheduling.stop())
}
