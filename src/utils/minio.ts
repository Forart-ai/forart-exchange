import request, { ForartApiResponseBody } from './request'

export type ForartMinioRequest = {
  styleFile: any,
  imageGroup : number
}

function uploadToMinio(file: any, imageGroup: number) {
  const url = 'https://api.forart.ai/api/forart/web/v1/style/create'
  const data = new FormData()
  data.append('styleFile', file)
  // @ts-ignore

  // @ts-ignore
  const boundary = data._boundary

  const config = {
    headers:{
      'Content-Type': `multipart/form-data; boundary = ${boundary}`,
    }
  }

  return request.post<ForartApiResponseBody<any>>(url,data,config)

}

export { uploadToMinio }
