import consola, { ConsolaLogObject } from 'consola'
import _ from 'lodash'

const tag = 'wechat'

const logger = consola.withTag(tag)

const loggerMethods = [
  'fatal',
  'error',
  'warn',
  'log',
  'info',
  'start',
  'success',
  'ready',
  'debug',
  'trace',
]

_.forEach(loggerMethods, (item) => {
  const handler = logger[item]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logger[item] = (message: ConsolaLogObject | any, ...args: any[]): void => {
    handler(`[${tag}] ${message}`, ...args)
  }
})

export default logger
