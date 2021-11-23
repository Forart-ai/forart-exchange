import axios from 'axios'

const request = axios.create({
  baseURL:'/api'
})

export type ForartApiResponseBody<T> = {
  code: number
  data: T
  message: string
  success: boolean
}


request.interceptors.response.use(
  function onFulfilled(config) {
    const { data: responseBody } = config

    if (+(responseBody as ForartApiResponseBody<any>).code === 200) {
      return responseBody.data
    }

    return config.data
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

export default request
