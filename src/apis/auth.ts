import { Service } from './service'

const AUTH_API = {
  userSignLogin(params: {wallet: string, toSign: string, signed: string}) {
    return Service.post('/login', params)
  }
}

export default AUTH_API
