import got, { Options } from 'got'
import _ from 'lodash'
import querystring from 'querystring'

import { catchRequestError } from './errors'
import logger from './logger'

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'
type RequestHandler = <T>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  options?: Options
) => Promise<T>

const request: Record<RequestMethod, RequestHandler> = {
  get<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    options?: Options
  ): Promise<T> {
    const opts = _.defaults(options, {
      responseType: 'json',
    })

    if (data) {
      const query = querystring.stringify(data)

      _.assign(opts, {
        searchParams: query,
      })
    }

    logger.trace(
      '=> send request to upstream wechat service with got.',
      url,
      opts
    )

    return catchRequestError<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      got.get<T>(url, opts as any).then((response) => {
        logger.trace('<= response from upstream wechat service.', {
          url,
          response: response.body,
        })

        return response.body
      })
    )
  },
  post<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    options?: Options
  ): Promise<T> {
    const opts = _.defaults(options, {
      responseType: 'json',
    })

    if (data) {
      _.assign(opts, {
        json: data,
      })
    }

    logger.trace(
      '=> send request to upstream wechat service with got.',
      url,
      opts
    )

    return catchRequestError<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      got.post<T>(url, opts as any).then((response) => {
        logger.trace('<= response from upstream wechat service.', {
          url,
          response: response.body,
        })

        return response.body
      })
    )
  },
  put<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    options?: Options
  ): Promise<T> {
    const opts = _.defaults(options, {
      responseType: 'json',
    })

    if (data) {
      _.assign(opts, {
        json: data,
      })
    }

    logger.trace(
      '=> send request to upstream wechat service with got.',
      url,
      opts
    )

    return catchRequestError<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      got.put<T>(url, opts as any).then((response) => {
        logger.trace('<= response from upstream wechat service.', {
          url,
          response: response.body,
        })

        return response.body
      })
    )
  },
  patch<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    options?: Options
  ): Promise<T> {
    const opts = _.defaults(options, {
      responseType: 'json',
    })

    if (data) {
      _.assign(opts, {
        json: data,
      })
    }

    logger.trace(
      '=> send request to upstream wechat service with got.',
      url,
      opts
    )

    return catchRequestError<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      got.patch<T>(url, opts as any).then((response) => {
        logger.trace('<= response from upstream wechat service.', {
          url,
          response: response.body,
        })

        return response.body
      })
    )
  },
  delete<T>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    options?: Options
  ): Promise<T> {
    const opts = _.defaults(options, {
      responseType: 'json',
    })

    if (data) {
      const query = querystring.stringify(data)

      _.assign(opts, {
        searchParams: query,
      })
    }

    logger.trace(
      '=> send request to upstream wechat service with got.',
      url,
      opts
    )

    return catchRequestError<T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      got.delete<T>(url, opts as any).then((response) => {
        logger.trace('<= response from upstream wechat service.', {
          url,
          response: response.body,
        })

        return response.body
      })
    )
  },
}

export default request
