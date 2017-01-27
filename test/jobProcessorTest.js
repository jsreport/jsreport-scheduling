require('should')
var path = require('path')
var Promise = require('bluebird')
var JobProcessor = require('../lib/jobProcessor')
var Reporter = require('jsreport-core').Reporter

describe('for jobProcessor', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    return reporter.init()
  })

  it('process should call handler and create task', function () {
    this.timeout(3000)
    reporter.scheduling.stop()

    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *'
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
      cron: '*/1 * * * * *'
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
      cron: '* * * * * 2090'
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
      cron: '* * * * * 2090'
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
})

