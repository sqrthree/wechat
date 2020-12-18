import { MINAPP_ERROR_MESSAGE } from '../constants'
import { ErrorResponse } from '../types/request'

export function throwError(name: string, message: string): void {
  const err = new Error(message)

  err.name = name

  throw err
}

export function catchRequestError<T>(action: Promise<T>): Promise<T> {
  return action.then((response: unknown) => {
    const { errcode, errmsg } = response as ErrorResponse

    if (errcode !== undefined && errcode !== 0) {
      const friendlyMessage = MINAPP_ERROR_MESSAGE[`${errcode}`]
      const message = `${errcode}: ${friendlyMessage || errmsg}`

      throwError(`${errcode}`, message)
    }

    return response as T
  })
}
