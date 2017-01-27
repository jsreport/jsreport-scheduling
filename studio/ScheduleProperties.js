import React, { Component } from 'react'

export default class ScheduleProperties extends Component {

  selectTemplates (entities) {
    return Object.keys(entities).filter((k) => entities[k].__entitySet === 'templates').map((k) => entities[k])
  }

  static title (entity, entities) {
    const templates = Object.keys(entities).map((k) => entities[k])
      .filter((t) => t.__entitySet === 'templates' && t.shortid === entity.templateShortid)

    if (!templates.length) {
      return 'schedule (select template...)'
    }

    return `schedule (${templates[0].name}) ${entity.enabled !== true ? '(disabled)' : ''}`
  }

  render () {
    const { entity, entities, onChange } = this.props
    const templates = this.selectTemplates(entities)

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
          <input
            type='text' value={entity.cron || ''} onChange={(v) => onChange({_id: entity._id, cron: v.target.value})} />
        </div>
        <div className='form-group'>
          <label>Enabled</label>
          <input type='checkbox' checked={entity.enabled !== false} onChange={(v) => onChange({_id: entity._id, enabled: v.target.checked})} />
        </div>
      </div>
    )
  }
}

