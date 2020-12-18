import _ from 'lodash'

import { sha1 } from '../helpers/crypto'
import logger from '../helpers/logger'
import { SDK } from './types'

export function verifySensitiveSignature(
  this: SDK,
  sessionKey: string,
  rawData: string,
  signature: string
): void {
  const str = `${rawData}${sessionKey}`

  const signResult = sha1(str)
  const valid = _.toLower(signResult) === _.toLower(signature)

  logger.debug('call signature.verifySensitiveSignature api.', {
    rawData,
    sessionKey,
    expect: signature,
    got: signResult,
  })

  if (!valid) {
    throw new Error(
      `Invalid signature. Expect ${signature}, but got ${signResult}`
    )
  }
}

export interface SignatureAPI {
  verifySensitiveSignature: (
    sessionKey: string,
    rawData: string,
    signature: string
  ) => void
}
