var CronTime = require('cron').CronTime
var _ = require('underscore')
var Promise = require('bluebird')

var JobProcessor = module.exports = function (executionHandler, documentStore, logger, TaskType, options) {
  if (!options.taskPingTimeout) {
    options.taskPingTimeout = 2 * options.interval
  }

  this.documentStore = documentStore
  this.logger = logger
  this.options = options
  this.executionHandler = executionHandler
  this.currentlyRunningTasks = []
  this.TaskType = TaskType

  options.now = options.now || function () {
    return new Date()
  }
}

JobProcessor.prototype.start = function () {
  this.interval = setInterval(JobProcessor.prototype.process.bind(this), this.options.interval)
}

JobProcessor.prototype.stop = function () {
  clearInterval(this.interval)
}

JobProcessor.prototype._schedulesToProcessFilter = function () {
  return {
    $and: [{nextRun: {$lt: this.options.now()}}, {state: 'planned'}, {enabled: true}]
  }
}

JobProcessor.prototype._tasksToRecoverFilter = function () {
  return {
    $and: [{ping: {$lt: new Date(this.options.now().getTime() - this.options.taskPingTimeout)}}, {state: 'running'}]
  }
}

JobProcessor.prototype._pingRunningTasks = function () {
  var ids = this.currentlyRunningTasks.map(function (t) {
    return t._id
  })
  return this.documentStore.collection('tasks').update({_id: {$in: ids}}, {$set: {ping: this.options.now()}})
}

JobProcessor.prototype._findTasksToRecover = function () {
  var self = this
  return this.documentStore.collection('tasks').find(self._tasksToRecoverFilter()).then(function (tasks) {
    if (tasks.length === 0) {
      return []
    }

    return self.documentStore.collection('schedules').find({}).then(function (schedules) {
      tasks.forEach(function (t) {
        t.schedule = _.findWhere(schedules, {shortid: t.scheduleShortid})
      })

      // someone could have deleted schedule, ignore these tasks
      return tasks.filter(function (t) {
        return t.schedule != null
      })
    })
  })
}

JobProcessor.prototype.process = function (options) {
  var self = this
  options = options || {}

  return self._pingRunningTasks().then(function () {
    if (self.currentlyRunningTasks.length >= self.options.maxParallelJobs) {
      return
    }

    return self._findTasksToRecover().then(function (tasks) {
      var promise = Promise.all(tasks.map(function (task) {
        self.logger.info('Recovering task ' + task.schedule.name)
        return self.processOne(task.schedule, task)
      }))
      return options.waitForJobToFinish ? promise : Promise.resolve()
    }).then(function () {
      return self.documentStore.collection('schedules').find(self._schedulesToProcessFilter()).then(function (schedules) {
        var promise = Promise.all(schedules.map(function (s) {
          return self.processOne(s, null)
        }))

        return options.waitForJobToFinish ? promise : Promise.resolve()
      })
    })
  }).catch(function (e) {
    self.logger.error('unable to load planned schedules ' + e.stack)
    throw e
  })
}

JobProcessor.prototype.processOne = function (schedule, task) {
  var self = this

  if (this.currentlyRunningTasks.length >= this.options.maxParallelJobs) {
    return
  }

  return this.documentStore.collection('schedules').update({
    _id: schedule._id,
    state: 'planned'
  }, {$set: {state: 'planning'}}).then(function (count) {
    if (count === 1) {
      return self.execute(schedule, task)
    }
  }).catch(function (e) {
    self.logger.error('unable to update schedule state' + e.stack)
  })
}

JobProcessor.prototype.execute = function (schedule, task, executeNow) {
  var self = this

  function insertTaskIfNotExists () {
    if (!task) {
      task = {
        creationDate: self.options.now(),
        scheduleShortid: schedule.shortid,
        state: 'running',
        ping: self.options.now()
      }
      self.currentlyRunningTasks.push(task)
      return self.documentStore.collection('tasks').insert(task).then(function (doc) {
        task._id = doc._id
      })
    }
    self.currentlyRunningTasks.push(task)
    return Promise.resolve()
  }

  return insertTaskIfNotExists().then(function () {
    if (executeNow === true) {
      return
    }

    var cron = new CronTime(schedule.cron)
    var nextRun = cron._getNextDateFrom(new Date(schedule.nextRun.getTime() + 1000)).toDate()

    return self.documentStore.collection('schedules').update({
      _id: schedule._id
    }, {$set: {state: 'planned', nextRun: new Date(nextRun.getTime())}})
  }).then(function () {
    return self.documentStore.collection('templates').find({shortid: schedule.templateShortid}).then(function (templates) {
      if (templates.length > 0) {
        return self.executionHandler(schedule, task).then(function () {
          self.logger.debug('Processing schedule ' + schedule.name + ' succeeded.')
          return self.documentStore.collection('tasks').update({_id: task._id},
            {
              $set: {
                state: 'success',
                finishDate: self.options.now()
              }
            })
        })
      }

      self.logger.debug('Schedule template not found, marking task as error')
      return self.documentStore.collection('tasks').update({_id: task._id},
        {
          $set: {
            state: 'error',
            error: 'Template shortid:' + schedule.templateShortid + ' was not found',
            finishDate: self.options.now()
          }
        })
    }).catch(function (e) {
      self.logger.debug('Processing schedule ' + schedule.name + ' failed with :' + e.stack)
      return self.documentStore.collection('tasks').update(
        {_id: task._id},
        {
          $set: {
            state: e.canceled ? 'canceled' : 'error',
            error: e.stack,
            finishDate: self.options.now()
          }
        })
    }).finally(function () {
      self.currentlyRunningTasks = _.filter(self.currentlyRunningTasks, function (t) {
        return t._id !== task._id
      })
    })
  })
}
