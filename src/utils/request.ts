import axios from 'axios'

const request = axios.create({
  baseURL:'/api'
})

request.interceptors.request.use(config => {
  return config
})

export default request
