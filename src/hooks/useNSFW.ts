import { useCallback, useEffect } from 'react'
import * as nsfwjs from 'nsfwjs'

const useNSFW = () => {

  const isPornImage = useCallback(
    async (img: HTMLImageElement) => {
      const unseemly = ['Porn', 'Hentai', 'Sexy']
      let unseenRate = 0

      const model = await nsfwjs.load()

      // Classify the image
      const predictions = await model.classify(img)
      console.log(img)

      predictions.map((item, index) => {
        if (unseemly.includes(item.className)) {
          console.log(item.probability)
          unseenRate = unseenRate + item.probability
        }
      })
      return unseenRate * 100

    }, []
  )
  return { isPornImage }
}

export default useNSFW
