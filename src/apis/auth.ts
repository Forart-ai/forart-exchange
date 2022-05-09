import { Service } from './service'

export type UploadImageParam = {
  file: any,
  wallet?: string
}

const AUTH_API = {
  userSignLogin(params: {wallet: string, toSign: string, signed: string}) {
    return Service.post('/login', params)
  },

  uploadImage(file: any, wallet?: string) {
    const data = new FormData()
    data.append('file', file)

    // @ts-ignore
    const boundary = data._boundary
    const config = {
      headers:{
        'Content-Type': `multipart/form-data; boundary = ${boundary}`,
      }
    }

    return Service.post('/avatar/upload',{ file, wallet }, config)
  }
}

export default AUTH_API
