import { LogLevel } from 'consola'
import _ from 'lodash'

import logger from '../helpers/logger'
import { SDKOptions } from '../types/minapp'
import { AuthAPI, code2Session } from './auth'

export const defaultMinAppSDKOptions: SDKOptions = {
  debug: false,
}

export class MinAppSDK {
  appID = ''

  appSecret = ''

  options: SDKOptions

  auth: AuthAPI

  constructor(options?: Partial<SDKOptions>) {
    this.options = _.defaults(options, defaultMinAppSDKOptions)

    this.auth = {
      code2Session: code2Session.bind(this),
    }
  }

  init(appID: string, secret: string): MinAppSDK {
    this.appID = appID
    this.appSecret = secret

    logger.debug(`Init sdk with appID: ${appID}, secret: ${secret}`)

    return this
  }

  config(options: Partial<SDKOptions>): MinAppSDK {
    if (this.options) {
      this.options = _.assign(this.options, options)
    }

    logger.level = this.options.debug ? LogLevel.Verbose : LogLevel.Warn

    return this
  }

  // eslint-disable-next-line class-methods-use-this
  create(
    appID: string,
    secret: string,
    options?: Partial<SDKOptions>
  ): MinAppSDK {
    return new MinAppSDK(options).init(appID, secret)
  }
}

export const Minapp = MinAppSDK
export const minapp = new MinAppSDK()
