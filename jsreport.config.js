module.exports = {
  'name': 'scheduling',
  'main': 'lib/scheduling.js',
  'optionsSchema': {
    extensions: {
      scheduling: {
        type: 'object',
        properties: {
          autoStart: { type: 'boolean' },
          interval: { type: 'number' },
          minScheduleInterval: { type: 'number' },
          misfireThreshold: { type: 'number' },
          maxParallelJobs: { type: 'number' },
          taskPingTimeout: { type: 'number' },
          cleanScheduleHistoryInterval: { type: 'number' },
          maxHistoryPerSchedule: { type: 'number' }
        }
      }
    }
  },
  'dependencies': ['templates', 'reports'],
  'skipInExeRender': true
}
