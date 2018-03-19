const cronParser = require('cron-parser')

const cronPlaceholderRegExp = /^([^\s]+)([\s])+\1\2+\1\2+\1\2+\1\2*(\1\2*)?$/

module.exports = function (cron, options = {}) {
  if (!cronPlaceholderRegExp.test(cron)) {
    throw new Error('Cron expression should have only 5 or 6 parts')
  }

  return cronParser.parseExpression(cron, options)
}
