import _ from 'lodash'

import { MINAPP_API_HOST, MINAPP_SUBSCRIBEMESSAGE_SEND } from '../constants'
import logger from '../helpers/logger'
import request from '../helpers/request'
import { SDK } from './types'

export interface SendPayload {
  accessToken: string
  toUser: string
  templateID: string
  page?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  miniprogramState?: string
  lang?: string
}

export async function send(this: SDK, payload: SendPayload): Promise<void> {
  const url = `${MINAPP_API_HOST}${MINAPP_SUBSCRIBEMESSAGE_SEND}`

  _.assign(payload, {
    access_token: payload.accessToken,
    touser: payload.toUser,
    template_id: payload.templateID,
    miniprogram_state: payload.miniprogramState,
  })

  logger.debug('call subscribeMessage.send api.', payload)

  return request.post<void>(
    `${url}?access_token=${payload.accessToken}`,
    payload
  )
}

export interface MessageAPI {
  send: (payload: SendPayload) => Promise<void>
}
