import aiDriverRequest from '../utils/aiDriverRequest'
import request from '../utils/request'

export function mergeImage(obj: any) {
  return request.post('genNftInfo/mergeImage', obj)
}

export function aiGeneratorStyle(style: string, content: string, threshold: number) {
  const data = {
    style: style,
    content: content,
    iteration: 500,
    imageSize: 512,
    threshold: threshold / 10000
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

export function textToImage(input_text: string) {
  return aiDriverRequest.post('genImage', {
    input_text,
  })
}
