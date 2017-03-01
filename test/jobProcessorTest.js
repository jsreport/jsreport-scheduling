require('should')
var path = require('path')
var Promise = require('bluebird')
var JobProcessor = require('../lib/jobProcessor')
var Reporter = require('jsreport-core').Reporter

describe('for jobProcessor', function () {
  var reporter
  var template

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../'),
      scheduling: {
        minScheduleInterval: 0
      }
    })

    return reporter.init().then(function () {
      return reporter.documentStore.collection('templates').insert({
        content: 'foo',
        engine: 'none',
        recipe: 'html'
      }).then(function (t) {
        template = t
      })
    })
  })

  it('process should call handler and create task', function () {
    this.timeout(3000)
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function () {
      var counter = 0

      function exec () {
        counter++
        return Promise.resolve()
      }

      var jobProcessor = new JobProcessor(exec, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
        interval: 50,
        maxParallelJobs: 1
      })
      return jobProcessor.process({waitForJobToFinish: true}).then(function () {
        return reporter.documentStore.collection('tasks').find({}).then(function (tasks) {
          tasks.length.should.be.exactly(1)
          tasks[0].state.should.be.exactly('success')
          tasks[0].finishDate.should.be.ok()
          counter.should.be.exactly(1)
        })
      })
    })
  })

  it('should not cross maxParallelJobs', function () {
    this.timeout(2000)
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function () {
      var counter = 0

      function exec () {
        counter++
        return Promise.resolve()
      }

      var jobProcessor = new JobProcessor(exec, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
        interval: 50,
        maxParallelJobs: 0
      })
      return jobProcessor.process({waitForJobToFinish: true}).then(function () {
        counter.should.be.exactly(0)
      })
    })
  })

  it('should recover failed tasks', function () {
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '* * * * * 2090',
      templateShortid: template.shortid
    }).then(function (schedule) {
      reporter.documentStore.collection('tasks').insert({
        ping: new Date(1),
        state: 'running',
        scheduleShortid: schedule.shortid
      })
    }).then(function () {
      var counter = 0

      function exec () {
        counter++
        return Promise.resolve()
      }

      var jobProcessor = new JobProcessor(exec, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
        interval: 20,
        maxParallelJobs: 1,
        taskPingTimeout: 10
      })

      return jobProcessor.process({waitForJobToFinish: true}).then(function () {
        counter.should.be.exactly(1)
      })
    })
  })

  it('should ping running tasks', function () {
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '* * * * * 2090',
      templateShortid: template.shortid
    }).then(function (schedule) {
      return reporter.documentStore.collection('tasks').insert({
        ping: new Date(new Date().getTime() - 1000),
        state: 'running',
        scheduleShortid: schedule.shortid
      }).then(function (task) {
        function exec () {
          return Promise.resolve()
        }

        var jobProcessor = new JobProcessor(exec, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
          interval: 20,
          maxParallelJobs: 1
        })
        jobProcessor.currentlyRunningTasks.push(task)
        return jobProcessor.process({waitForJobToFinish: true}).then(function () {
          return reporter.documentStore.collection('tasks').find({}).then(function (tasks) {
            tasks[0].ping.should.not.be.exactly(task.ping)
          })
        })
      })
    })
  })

  it('_findTasksToRecover should skip tasks without schedules', function () {
    reporter.scheduling.stop()

    return reporter.documentStore.collection('tasks').insert({
      ping: new Date(1),
      state: 'running',
      scheduleShortid: 'invalid'
    }).then(function () {
      var jobProcessor = new JobProcessor(function () {}, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
        interval: 50,
        maxParallelJobs: 1
      })

      return jobProcessor._findTasksToRecover()
    }).then(function (tasks) {
      tasks.should.have.length(0)
    })
  })

  it('process should error schedules with missing templates', function () {
    this.timeout(3000)
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: 'invalid'
    }).then(function () {
      var jobProcessor = new JobProcessor(function () { }, reporter.documentStore, reporter.logger, reporter.scheduling.TaskType, {
        interval: 50,
        maxParallelJobs: 1
      })
      return jobProcessor.process({waitForJobToFinish: true}).then(function () {
        return reporter.documentStore.collection('tasks').find({}).then(function (tasks) {
          tasks.length.should.be.exactly(1)
          tasks[0].state.should.be.exactly('error')
          tasks[0].error.should.containEql('Template')
        })
      })
    })
  })
})

