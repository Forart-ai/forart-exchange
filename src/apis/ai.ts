import aiDriverRequest from '../utils/aiDriverRequest'
import request from '../utils/request'

export function mergeImage(obj: any) {
  return request.post('genNftInfo/mergeImage', obj)
}

export function aiGeneratorStyle(style: string, content: string) {
  const data = {
    style: style,
    content: content
  }

  return aiDriverRequest.post('tranforImage', data, {
    responseType: 'blob'
  })
}

export function aiGeneratorImage(object: string, accessories: string, behavior: string) {
  return aiDriverRequest.post('/genImage', {
    object,
    accessories,
    behavior
  })
}

export function aiGeneratorImageByContent(content:string) {
  return aiDriverRequest.post('/genImage', {
    content,
  })
}
