import { useRef, useEffect } from 'react'
import axios from 'axios'

// edith 生成的 api 调用方式
type EdithApiCall = (payload: any, options: any) => Promise<any>
// 内部 http.config.js  调用 api
type InnerApiCall = (apiName: string, options: any, config: any) => Promise<any>

const CANCEL_SYBOL = 'useCancelToken cancel request'

export const isCancelRequest = (error: any) => axios.isCancel(error) || error?.message?.includes?.(CANCEL_SYBOL)

export function useCancelToken () {
  const cancelTokenSources = useRef<Map<EdithApiCall | string, any>>(new Map())

  const createCancelToken = (apiFunc: EdithApiCall | string) => {
    if (cancelTokenSources.current.has(apiFunc)) {
      cancelTokenSources.current
        .get(apiFunc)
        ?.cancel(`${CANCEL_SYBOL}: Operation canceled due to new request.`)
    }
    const source = axios.CancelToken.source()
    cancelTokenSources.current.set(apiFunc, source)
    return source.token
  }

  const callApiWithCancelTokenEdithMode = async (
    apiFunc: EdithApiCall,
    payload: any,
    options = {}
  ) => {
    const cancelToken = createCancelToken(apiFunc)
    const response = await apiFunc(payload, { ...options, cancelToken })
    return response
  }

  const callApiWithCancelTokenInnerMode = async (
    apiFunc: InnerApiCall,
    apiName: string,
    payload: any,
    options = {}
  ) => {
    const cancelToken = createCancelToken(apiName)
    const response = await apiFunc(apiName, payload, { ...options, cancelToken })
    return response
  }

  const callApiWithCancelToken = (apiFunc: EdithApiCall | InnerApiCall, ...args: any[]) => {
    const [apiName] = args
    if (typeof apiName === 'string') {
      return callApiWithCancelTokenInnerMode(apiFunc, ...args)
    }
    return callApiWithCancelTokenEdithMode(apiFunc, ...args)
  }

  useEffect(() => () => {
    cancelTokenSources.current.forEach(source => {
      source.cancel(`${CANCEL_SYBOL}:Component unmounted.`)
    })
    cancelTokenSources.current.clear()
  }, [])

  return {
    callApiWithCancelToken
  }
}
