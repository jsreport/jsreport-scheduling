import React, { Component } from 'react'
import ordinal from 'ordinal-number-suffix'
import CronBuilder from 'cron-builder'
import cronstrue from 'cronstrue'
import HourTimePicker from './HourTimePicker'

export default class ScheduleProperties extends Component {
  constructor (props) {
    super(props)

    this.state = {
      useExpression: true,
      showHour: false,
      showMinute: false,
      showDay: false,
      showMonth: false,
      selectedPeriod: '',
      selectedHour: null,
      selectedMinute: null,
      selectedDay: null,
      selectedMonth: null,
      days: []
    }
  }

  selectTemplates (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'templates').map((k) => entities[k])
  }

  static title (entity, entities) {
    const templates = Object.keys(entities).map((k) => entities[k])
      .filter((t) => t.__entitySet === 'templates' && t.shortid === entity.templateShortid)

    if (!templates.length) {
      return 'schedule (select template...)'
    }

    return `schedule (${templates[0].name}) ${entity.enabled !== true && entity.enabled != null ? '(disabled)' : ''}`
  }

  onCronBuilderChange (stateToSet) {
    const cronExp = new CronBuilder()

    let {
      onChange,
      entity
    } = this.props

    let {
      selectedPeriod,
      selectedHour,
      selectedMinute,
      selectedDay,
      selectedMonth
    } = this.state

    let cron

    if (stateToSet && stateToSet.selectedPeriod !== undefined) {
      selectedPeriod = stateToSet.selectedPeriod
    }

    if (stateToSet && stateToSet.selectedHour !== undefined) {
      selectedHour = stateToSet.selectedHour
    }

    if (stateToSet && stateToSet.selectedMinute !== undefined) {
      selectedMinute = stateToSet.selectedMinute
    }

    if (stateToSet && stateToSet.selectedDay !== undefined) {
      selectedDay = stateToSet.selectedDay
    }

    if (stateToSet && stateToSet.selectedMonth !== undefined) {
      selectedMonth = stateToSet.selectedMonth
    }

    if (selectedPeriod === 'mn') {
      cron = '* * * * *'
    } else if (selectedPeriod === 'h') {
      cronExp.addValue('minute', String(parseInt(selectedMinute, 10)))
    } else if (selectedPeriod === 'd') {
      cronExp.addValue('hour', String(parseInt(selectedHour, 10)))
      cronExp.addValue('minute', String(parseInt(selectedMinute, 10)))
    } else if (selectedPeriod === 'w') {
      cronExp.addValue('dayOfTheWeek', String(parseInt(selectedDay, 10)))
      cronExp.addValue('hour', String(parseInt(selectedHour, 10)))
      cronExp.addValue('minute', String(parseInt(selectedMinute, 10)))
    } else if (selectedPeriod === 'm') {
      cronExp.addValue('dayOfTheMonth', String(parseInt(selectedDay, 10)))
      cronExp.addValue('hour', String(parseInt(selectedHour, 10)))
      cronExp.addValue('minute', String(parseInt(selectedMinute, 10)))
    } else if (selectedPeriod === 'y') {
      cronExp.addValue('dayOfTheMonth', String(parseInt(selectedDay, 10)))
      cronExp.addValue('hour', String(parseInt(selectedHour, 10)))
      cronExp.addValue('minute', String(parseInt(selectedMinute, 10)))
      cronExp.addValue('month', String(parseInt(selectedMonth, 10)))
    } else {
      cron = ''
    }

    if (cron == null) {
      cron = cronExp.build()
    }

    onChange({
      _id: entity._id,
      cron: cron
    })

    if (stateToSet) {
      this.setState(stateToSet)
    }
  }

  onPeriodChange (period, returnState) {
    var newState = {
      selectedPeriod: period
    }

    newState.days = []

    if (period === 'm' || period === 'y') {
      for (let i = 1; i <= 31; i++) {
        newState.days.push({
          name: ordinal(i),
          value: i
        })
      }
    }

    if (period === 'mn') {
      newState.showHour = false
      newState.showMinute = false
      newState.showDay = false
      newState.showMonth = false
      newState.selectedHour = null
      newState.selectedMinute = null
      newState.selectedDay = null
      newState.selectedMonth = null
    } else if (period === 'h') {
      newState.showHour = false
      newState.showMinute = true
      newState.showDay = false
      newState.showMonth = false
      newState.selectedHour = null
      newState.selectedMinute = '00'
      newState.selectedDay = null
      newState.selectedMonth = null
    } else if (period === 'd') {
      newState.showHour = true
      newState.showMinute = true
      newState.showDay = false
      newState.showMonth = false
      newState.selectedHour = '12'
      newState.selectedMinute = '00'
      newState.selectedDay = null
      newState.selectedMonth = null
    } else if (period === 'w') {
      newState.showHour = true
      newState.showMinute = true
      newState.showDay = true
      newState.showMonth = false
      newState.selectedHour = '12'
      newState.selectedMinute = '00'
      newState.selectedDay = 1
      newState.selectedMonth = null

      newState.days = [{
        name: 'Monday',
        value: 1
      }, {
        name: 'Tuesday',
        value: 2
      }, {
        name: 'Wednesday',
        value: 3
      }, {
        name: 'Thursday',
        value: 4
      }, {
        name: 'Friday',
        value: 5
      }, {
        name: 'Saturday',
        value: 6
      }, {
        name: 'Sunday',
        value: 0
      }]
    } else if (period === 'm') {
      newState.showHour = true
      newState.showMinute = true
      newState.showDay = true
      newState.showMonth = false
      newState.selectedHour = '12'
      newState.selectedMinute = '00'
      newState.selectedDay = 1
      newState.selectedMonth = null
    } else if (period === 'y') {
      newState.showHour = true
      newState.showMinute = true
      newState.showDay = true
      newState.showMonth = true
      newState.selectedHour = '12'
      newState.selectedMinute = '00'
      newState.selectedDay = 1
      newState.selectedMonth = '01'
    } else {
      newState.showHour = false
      newState.showMinute = false
      newState.showDay = false
      newState.showMonth = false
      newState.selectedHour = null
      newState.selectedMinute = null
      newState.selectedDay = null
      newState.selectedMonth = null
    }

    if (returnState) {
      return newState
    }

    this.setState(newState)
  }

  render () {
    const {
      useExpression,
      showHour,
      showMinute,
      showDay,
      showMonth,
      selectedPeriod,
      selectedHour,
      selectedMinute,
      selectedDay,
      selectedMonth,
      days
    } = this.state
    const { entity, entities, onChange } = this.props
    const templates = this.selectTemplates(entities)
    let cronDescription = ''

    if (entity.cron) {
      try {
        cronDescription = cronstrue.toString(entity.cron)
      } catch (e) {
        cronDescription = 'Invalid cron expression'
      }
    }

    if (!entity || entity.__entitySet !== 'schedules') {
      return <div />
    }

    return (
      <div>
        <div className='form-group'>
          <label>Template</label>
          <select
            value={entity.templateShortid ? entity.templateShortid : ''}
            onChange={(v) => onChange({_id: entity._id, templateShortid: v.target.value !== 'empty' ? v.target.value : null})}>
            <option key='empty' value='empty'>- not selected -</option>
            {templates.map((e) => <option key={e.shortid} value={e.shortid}>{e.name}</option>)}
          </select>
        </div>
        <div className='form-group'>
          <label>CRON</label>
          {!useExpression && (
            <div className='form-group'>
              <span>Expression: {entity.cron}</span>
            </div>
          )}
          <div className='form-group'>
            <span>Description: {cronDescription}</span>
          </div>
          <div className='form-group'>
            <label>
              <input
                type='checkbox'
                checked={useExpression}
                onChange={(v) => this.onCronBuilderChange({
                  useExpression: v.target.checked,
                  ...this.onPeriodChange('', true)
                })}
              />
              Use expression
            </label>
            {useExpression && (
              <input
                type='text' value={entity.cron || ''} onChange={(v) => onChange({_id: entity._id, cron: v.target.value})} />
            )}
          </div>
          {!useExpression && (
            <div className='form-group'>
              <label>
                Every
                {' '}
                <select
                  value={selectedPeriod}
                  onChange={(ev) => this.onCronBuilderChange(this.onPeriodChange(ev.target.value, true))}
                >
                  <option key='-' value=''>- not selected -</option>
                  <option key='mn' value='mn'>minute</option>
                  <option key='h' value='h'>hour</option>
                  <option key='d' value='d'>day</option>
                  <option key='w' value='w'>week</option>
                  <option key='m' value='m'>month</option>
                  <option key='y' value='y'>year</option>
                </select>
              </label>
            </div>
          )}
          {!useExpression && showDay && (
            <div className='form-group'>
              <label>
                {`on${showMonth ? ' the' : ''}`}
                {' '}
                <select
                  value={selectedDay}
                  onChange={(ev) => this.onCronBuilderChange({ selectedDay: ev.target.value })}
                >
                  {days.map((day) => <option key={day.value} value={day.value}>{day.name}</option>)}
                </select>
              </label>
            </div>
          )}
          {!useExpression && showMonth && (
            <div className='form-group'>
              <label>
                of
                {' '}
                <select
                  value={selectedMonth}
                  onChange={(ev) => this.onCronBuilderChange({ selectedMonth: ev.target.value })}
                >
                  <option key='01' value='01'>January</option>
                  <option key='02' value='02'>February</option>
                  <option key='03' value='03'>March</option>
                  <option key='04' value='04'>April</option>
                  <option key='05' value='05'>May</option>
                  <option key='06' value='06'>June</option>
                  <option key='07' value='07'>July</option>
                  <option key='08' value='08'>August</option>
                  <option key='09' value='09'>September</option>
                  <option key='10' value='10'>October</option>
                  <option key='11' value='11'>November</option>
                  <option key='12' value='12'>December</option>
                </select>
              </label>
            </div>
          )}
          {!useExpression && (showHour || showMinute) && (
            <div className='form-group'>
              <div>
                at
                {' '}
                <div style={{ display: 'inline-block' }}>
                  {showHour && (
                    <HourTimePicker
                      type='hour'
                      value={selectedHour}
                      onChange={(val) => this.onCronBuilderChange({ selectedHour: val })}
                    />
                  )}
                  {showHour && showMinute && ' : '}
                  {showMinute && (
                    <HourTimePicker
                      type='minute'
                      value={selectedMinute}
                      onChange={(val) => this.onCronBuilderChange({ selectedMinute: val })}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='form-group'>
          <label>Enabled</label>
          <input type='checkbox' checked={entity.enabled !== false} onChange={(v) => onChange({_id: entity._id, enabled: v.target.checked})} />
        </div>
      </div>
    )
  }
}
