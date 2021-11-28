import axios from 'axios'

const aiDriverRequest = axios.create({
  baseURL: 'http://175.27.190.185:8898',
  timeout: 20000
})

aiDriverRequest.interceptors.request.use(config => {
  return config
})

export default aiDriverRequest
