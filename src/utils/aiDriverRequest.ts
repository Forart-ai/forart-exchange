import axios from 'axios'

const aiDriverRequest = axios.create({
  baseURL: 'http://52.221.228.254:8898',
  timeout: 20000
})

aiDriverRequest.interceptors.request.use(config => {
  return config
})

export default aiDriverRequest
