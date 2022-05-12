import React, { HTMLAttributes, ImgHTMLAttributes, useEffect, useRef, useState } from 'react'
import { ImageProps } from './types'
import { Skeleton, styled } from '@mui/material'
import observerOptions from './options'
import Wrapper from './Wrapper'

const StyledImage = styled('img')`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const Image: React.FC<ImageProps> = ({ src, alt, width, height,variant, ...props }) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver
    const isSupported = typeof window === 'object' && window.IntersectionObserver

    if (imgRef.current && isSupported) {
      observer = new window.IntersectionObserver(entries => {
        entries.forEach(entry => {
          const { isIntersecting } = entry
          if (isIntersecting) {
            // setTimeout(()=>setIsLoaded(true), 2000)
            setIsLoaded(true)
            if (typeof observer?.disconnect === 'function') {
              observer.disconnect()
            }
          }
        })
      }, observerOptions)
      observer.observe(imgRef.current)
    }

    return () => {
      if (typeof observer?.disconnect === 'function') {
        observer.disconnect()
      }
    }
  }, [src])

  return (
    <Wrapper ref={imgRef} height={height} width={width} {...props}>
      {
        isLoaded ?
          <StyledImage src={src} alt={alt} />
          :
          <Skeleton sx={{ backgroundColor: '#0e1833' }} animation={'wave'} variant={variant} width={'100%'} height={'100%'}  />
      }
    </Wrapper>
  )
}

export default Image
