require('should')
const jsreport = require('jsreport-core')

describe('with scheduling extension', function () {
  let reporter
  let template

  beforeEach(async () => {
    reporter = jsreport({
      scheduling: {
        minScheduleInterval: 0
      }
    })
    reporter.use(require('jsreport-templates')())
    reporter.use(require('jsreport-reports')())
    reporter.use(require('../')())

    await reporter.init()
    template = await reporter.documentStore.collection('templates').insert({
      content: 'foo',
      engine: 'none',
      recipe: 'html'
    })
  })

  it('creating schedule should add default values', async () => {
    const schedule = await reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    })

    schedule.nextRun.should.be.ok()
    schedule.creationDate.should.be.ok()
    schedule.state.should.be.exactly('planned')
  })

  it('updating schedule should recalculate nextRun', async () => {
    const schedule = await reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    })
    await reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
      $set: {
        name: 'foo',
        state: 'planned',
        cron: '*/1 * * * * *',
        nextRun: null,
        templateShortid: template.shortid
      }
    })

    const schedules = await reporter.documentStore.collection('schedules').find({})
    schedules[0].nextRun.should.be.ok()
  })

  it('render process job should render report', async () => {
    reporter.scheduling.stop()

    let counter = 0

    reporter.beforeRenderListeners.insert(0, 'test init', this, () => counter++)

    await reporter.documentStore.collection('templates').insert({
      content: 'foo',
      recipe: 'html',
      engine: 'none'
    })

    const task = await reporter.documentStore.collection('tasks').insert({})
    await reporter.scheduling.renderReport({templateShortid: template.shortid}, task)
    counter.should.be.exactly(1)
  })

  it('updating schedule without template should throw', async () => {
    const schedule = await reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    })

    return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
      $set: {
        name: 'foo2',
        cron: '*/1 * * * * *',
        state: 'planned'
      }
    }).should.be.rejected()
  })

  it('updating schedule without cron should throw', async () => {
    const schedule = await reporter.documentStore.collection('schedules').insert({
      cron: '*/1 * * * * *',
      templateShortid: template.shortid
    })

    return reporter.documentStore.collection('schedules').update({shortid: schedule.shortid}, {
      $set: {
        name: 'foo2',
        templateShortid: template.shortid,
        state: 'planned'
      }
    }).should.be.rejected()
  })
})

describe('with scheduling extension and minimal schedule interval limit', () => {
  let reporter
  let template

  beforeEach(async () => {
    reporter = jsreport({
      scheduling: {
        minScheduleInterval: 120000
      }
    })
    reporter.use(require('../')())
    reporter.use(require('jsreport-templates')())
    reporter.use(require('jsreport-reports')())

    await reporter.init()
    template = await reporter.documentStore.collection('templates').insert({
      content: 'foo',
      engine: 'none',
      recipe: 'html'
    })
  })

  it('should pass with the bigger interval', () => {
    return reporter.documentStore.collection('schedules').insert({
      cron: '1 1 * * * *',
      templateShortid: template.shortid
    })
  })

  it('should throw with the smaller interval', () => {
    return reporter.documentStore.collection('schedules').insert({
      cron: '1 * * * * *',
      templateShortid: template.shortid
    }).should.be.rejected()
  })
})
