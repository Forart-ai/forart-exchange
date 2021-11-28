import axios from 'axios'

const forartRequest = axios.create({
  baseURL:'https://api.forart.co/api/forart/web/v1'
})

export type ForartApiResponseBody<T> = {
  code: number
  data: T
  message: string
  success: boolean
}


forartRequest.interceptors.response.use(
  function onFulfilled(config) {
    const { data: responseBody } = config

    if (+(responseBody as ForartApiResponseBody<any>).code === 200) {
      return responseBody.data
    }

    return config
  },
  function onRejected(error: any) {
    return error
  }
)

export type ForartApiPagingData<T> = {
  current: number
  hitCount: boolean
  optimizeCountSql: boolean
  orders: Array<any>
  pages: number
  records: Array<T>
  searchCount: boolean
  size: number
  total: number
}

export default forartRequest
