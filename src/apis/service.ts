import axios from 'axios'
import Cookies from 'js-cookie'

function onResponseFulfilled(config: any) {
  const { data: responseBody } = config

  if (responseBody.code) {
    if (+responseBody.code === 200) {
      return responseBody.data
    }
    return Promise.reject(responseBody.message)
  }

  return config.data
}

function onResponseRejected(error: any) {

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

const API_HOST = 'https://dev-api.forart.ai/'
// const API_HOST = 'https://api.forart.ai/api/forart/'

const Service = axios.create({
  baseURL: `${API_HOST}`
})

Service.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('TOKEN')
    const token = Cookies.get('USER_TOKEN')
    console.log(token)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token.replace(/"/g, '')}`
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Service.interceptors.response.use(
  onResponseFulfilled, onResponseRejected
)

export { Service }
