import { MINAPP_API_HOST, MINAPP_AUTH_CODE2SESSION } from '../constants'
import logger from '../helpers/logger'
import request from '../helpers/request'
import { SDK } from '../types/minapp'
import { ErrorResponse } from '../types/request'

type GrantType = 'authorization_code'

export interface Code2SessionResponse extends ErrorResponse {
  openid: string
  session_key: string
  unionid?: string
}

export interface Code2Session {
  (code: string, grantType?: GrantType): Promise<Code2SessionResponse>
}

export interface AuthAPI {
  code2Session: Code2Session
}

export async function code2Session(
  this: SDK,
  code: string,
  grantType: GrantType = 'authorization_code'
): Promise<Code2SessionResponse> {
  const url = `${MINAPP_API_HOST}${MINAPP_AUTH_CODE2SESSION}`

  logger.debug('call code2Session api.', { code, grantType })

  return request.get<Code2SessionResponse>(url, {
    appid: this.appID,
    secret: this.appSecret,
    js_code: code,
    grantType,
  })
}
