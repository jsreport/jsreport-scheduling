require('should')
var path = require('path')
var Reporter = require('jsreport-core').Reporter

describe('with scheduling extension', function () {
  var reporter

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../')
    })

    return reporter.init()
  })

  it('creating schedule should add default values', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: 'foo'
    }).then(function (schedule) {
      schedule.nextRun.should.be.ok()
      schedule.creationDate.should.be.ok()
      schedule.state.should.be.exactly('planned')
    })
  })

  it('updating schedule should recalculate nextRun', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: 'foo'
    }).then(function (schedule) {
      return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
        $set: {
          cron: '*/1 * * * * *',
          nextRun: null
        }
      })
    }).then(function () {
      return reporter.documentStore.collection('schedules').find({}).then(function (schedules) {
        schedules[0].nextRun.should.be.ok()
      })
    })
  })

  it('render process job should render report', function () {
    reporter.scheduling.stop()

    var counter = 0

    reporter.beforeRenderListeners.insert(0, 'test init', this, function (request, response) {
      counter++
    })

    reporter.documentStore.collection('templates').insert({
      content: 'foo',
      recipe: 'html',
      engine: 'none'
    }).then(function (template) {
      return reporter.documentStore.collection('tasks').insert({}).then(function (task) {
        return reporter.scheduling.renderReport({templateShortid: template.shortid}, task).then(function () {
          counter.should.be.exactly(1)
        })
      })
    })
  })
})

