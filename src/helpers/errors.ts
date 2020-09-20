import { MINAPP_ERROR_MESSAGE } from '../constants'
import { ErrorResponse } from '../types/request'

export function throwError(name: string, message: string): void {
  const err = new Error(message)

  err.name = name

  throw err
}

export function catchRequestError<T extends ErrorResponse>(
  action: Promise<T>
): Promise<T> {
  return action.then((response) => {
    if (response.errcode !== undefined && response.errcode !== 0) {
      const friendlyMessage = MINAPP_ERROR_MESSAGE[`${response.errcode}`]
      const message = `${response.errcode}: ${
        friendlyMessage || response.errmsg
      }`

      throw new Error(message)
    }

    return response
  })
}
