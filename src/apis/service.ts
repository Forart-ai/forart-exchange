import axios from 'axios'

function onFulfilled(config: any) {
  const { data: responseBody } = config

  if (responseBody.code) {
    if (+responseBody.code === 200) {
      return responseBody.data
    }
    return Promise.reject(responseBody.message)
  }

  return config.data
}

function onRejected(error: any) {
  const responseData = error.response?.data

  if (!responseData) {
    return Promise.reject(error)
  }

  const { message, code } = responseData

  if (message && code) {
    return Promise.reject(message)
  }

  return Promise.reject(responseData)
}

const API_HOST = 'https://api.forart.ai/api/forart/'
// const API_HOST = 'http://192.168.3.41:25580/forart/'

const Service = axios.create({
  baseURL: `${API_HOST}`
})

Service.interceptors.response.use(
  onFulfilled, onRejected
)

export { Service }
