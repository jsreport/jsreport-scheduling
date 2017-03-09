require('should')
var path = require('path')
var Reporter = require('jsreport-core').Reporter

describe('with scheduling extension', function () {
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

  it('creating schedule should add default values', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function (schedule) {
      schedule.nextRun.should.be.ok()
      schedule.creationDate.should.be.ok()
      schedule.state.should.be.exactly('planned')
    })
  })

  it('updating schedule should recalculate nextRun', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function (schedule) {
      return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
        $set: {
          name: 'foo',
          state: 'planned',
          cron: '*/1 * * * * *',
          nextRun: null,
          templateShortid: template.shortid
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

    return reporter.documentStore.collection('templates').insert({
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

  it('updating schedule without template should throw', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function (schedule) {
      return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
        $set: {
          name: 'foo2',
          cron: '*/1 * * * * *',
          state: 'planned'
        }
      }).catch(function () {
        return 'validated'
      })
    }).then(function (res) {
      res.should.be.eql('validated')
    })
  })

  it('updating schedule without cron should throw', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    }).then(function (schedule) {
      return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
        $set: {
          name: 'foo2',
          templateShortid: template.shortid,
          state: 'planned'
        }
      }).catch(function () {
        return 'validated'
      })
    }).then(function (res) {
      res.should.be.eql('validated')
    })
  })
})

describe('with scheduling extension and minimal schedule interval limit', function () {
  var reporter
  var template

  beforeEach(function () {
    reporter = new Reporter({
      rootDirectory: path.join(__dirname, '../'),
      scheduling: {
        minScheduleInterval: 120000
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

  it('should pass with the bigger interval', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '1 1 * * * *',
      templateShortid: template.shortid
    })
  })

  it('should throw with the smaller interval', function () {
    return reporter.documentStore.collection('schedules').insert({
      cron: '1 * * * * *',
      templateShortid: template.shortid
    }).catch(function (e) {
      return 'validated'
    }).then(function (res) {
      res.should.be.eql('validated')
    })
  })
})
