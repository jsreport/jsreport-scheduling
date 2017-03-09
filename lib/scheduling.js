/*!
 * Copyright(c) 2017 Jan Blaha
 *
 * Extension capable of planning reoccurring jobs which are printing specified templates into reports.
 */

var events = require('events')
var shortid = require('shortid')
var util = require('util')
var Promise = require('bluebird')
var _ = require('underscore')
var CronTime = require('cron').CronTime
var JobProcessor = require('./jobProcessor')
var moment = require('moment')

var Scheduling = function (reporter, definition) {
  var self = this

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
  reporter.initializeListeners.add(definition.name, this, Scheduling.prototype._initialize)

  this.reporter.on('express-configure', function (app) {
    app.get('/api/scheduling/nextRun/:cron', function (req, res) {
      var cron

      try {
        cron = new CronTime(req.params.cron)

        try {
          res.send(cron._getNextDateFrom(new Date()).toDate())
        } catch (e) {
          res.send(new Date(0))
        }
      } catch (e) {
        res.status(500).send('invalid cron pattern, ' + e.message)
      }
    })

    app.post('/api/scheduling/runNow', function (req, res) {
      self.reporter.documentStore.collection('schedules').find({
        _id: req.body.scheduleId
      }).then(function (schedule) {
        if (schedule.length === 0) {
          return Promise.reject(new Error('can\'t find a schedule with id ' + req.body.scheduleId))
        }

        return self.reporter.scheduling.jobProcessor.execute(schedule[0], null, true)
      }).then(function () {
        res.status(200).end()
      }).catch(function (err) {
        res.status(500).end(err.message)
      })
    })
  })
}

util.inherits(Scheduling, events.EventEmitter)

Scheduling.prototype._updateNextRun = function (entity) {
  var cron = new CronTime(entity.cron)

  try {
    cron = new CronTime(entity.cron)
  } catch (e) {
    throw new Error('invalid cron pattern, ' + e.message)
  }

  entity.nextRun = cron._getNextDateFrom(new Date()).toDate()
  var intervalMS = cron._getNextDateFrom(new Date(entity.nextRun.getTime() + 1000)).toDate().getTime() - entity.nextRun.getTime()

  if (intervalMS < this.definition.options.minScheduleInterval) {
    throw new Error('Minimal interval for schedule is ' + moment.duration(this.definition.options.minScheduleInterval).humanize() +
      '. You are trying to set ' + moment.duration(intervalMS - 10000).humanize())
  }
}

Scheduling.prototype._beforeCreateHandler = function (entity) {
  if (!entity.shortid) {
    entity.shortid = shortid.generate()
  }

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

Scheduling.prototype._beforeUpdateHandler = function (query, update) {
  var entity = update.$set

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

Scheduling.prototype._initialize = function () {
  this.schedulesCollection = this.reporter.documentStore.collection('schedules')
  this.schedulesCollection.beforeInsertListeners.add('schedule', Scheduling.prototype._beforeCreateHandler.bind(this))
  this.schedulesCollection.beforeUpdateListeners.add('schedule', Scheduling.prototype._beforeUpdateHandler.bind(this))
}

Scheduling.prototype.stop = function () {
  this.jobProcessor.stop()
}

Scheduling.prototype.start = function () {
  this.jobProcessor.start()
}

Scheduling.prototype.renderReport = function (schedule, task) {
  return this.reporter.render({
    template: {shortid: schedule.templateShortid},
    user: {isAdmin: true},
    options: {
      scheduling: {taskId: task._id.toString(), schedule: schedule},
      reports: {save: true, mergeProperties: {taskId: task._id.toString()}}
    }
  })
}

module.exports = function (reporter, definition) {
  if (definition.options.enabled === false) {
    return
  }

  reporter[definition.name] = new Scheduling(reporter, definition)

  definition.options = _.extend({
    interval: 5000,
    maxParallelJobs: 5,
    minScheduleInterval: 60000
  }, definition.options)

  reporter[definition.name].jobProcessor = new JobProcessor(Scheduling.prototype.renderReport.bind(this), reporter.documentStore, reporter.logger, reporter[definition.name].TaskType, definition.options)

  if (definition.options.autoStart !== false) {
    reporter[definition.name].start()
  }
}
