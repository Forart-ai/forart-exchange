import aiDriverRequest from '../utils/aiDriverRequest'

export function aiGeneratorStyle(style: string, content:string) {
  const  data = {
    style:style,
    content: content
  }

  return aiDriverRequest.post('tranforImage',data, {
    responseType: 'blob'
  })

}

export function aiGeneratorImage(object: string, accessories: string, behavior: string) {
  const  data = {
    object:object,
    accessories: accessories,
    behavior: behavior
  }

  return aiDriverRequest.post('genImage',data, {
    responseType: 'json'
  })

}
