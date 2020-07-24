import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ScheduleEditor from './ScheduleEditor'
import Studio from 'jsreport-studio'

export default class DownloadButton extends Component {
  download () {
    if (ScheduleEditor.ActiveReport) {
      window.open(`${Studio.rootUrl}/reports/${ScheduleEditor.ActiveReport._id}/attachment`, '_self')
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

DownloadButton.propTypes = {
  tab: PropTypes.object,
  onUpdate: PropTypes.func.isRequired
}
