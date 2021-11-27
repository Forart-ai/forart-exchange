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
