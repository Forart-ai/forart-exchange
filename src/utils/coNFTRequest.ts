import axios from 'axios'

const coNFTRequest = axios.create({
  baseURL: 'https://api.forart.ai/api/forart/',
  timeout: 30000
})

// aiDriverRequest.interceptors.request.use(config => {
//   return config
// })

export default coNFTRequest
