import axios from 'axios'

const aiDriverRequest = axios.create({
  // baseURL: 'http://175.27.190.185:8898/',
  // baseURL: 'http://52.221.228.254:8898',
  // baseURL: 'https://43.131.247.213:8892/',

  baseURL: 'https://api.forart.ai/ai/',
  timeout: 60000000000
})

// aiDriverRequest.interceptors.request.use(config => {
//   return config
// })

export default aiDriverRequest
