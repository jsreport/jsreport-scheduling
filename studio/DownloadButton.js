import React, { Component } from 'react'
import ScheduleEditor from './ScheduleEditor'
import { relativizeUrl } from 'jsreport-studio'

export default class DownloadButton extends Component {
  static propTypes = {
    tab: React.PropTypes.object,
    onUpdate: React.PropTypes.func.isRequired
  }

  download () {
    if (ScheduleEditor.ActiveReport) {
      window.open(relativizeUrl(`/reports/${ScheduleEditor.ActiveReport._id}/content`), '_blank')
    }
  }

  render () {
    if (!this.props.tab || !this.props.tab.entity || this.props.tab.entity.__entitySet !== 'schedules' || !ScheduleEditor.ActiveReport) {
      return <div />
    }

    return <div className='toolbar-button' onClick={() => this.download()}>
      <i className='fa fa-download' />Download
    </div>
  }
}

