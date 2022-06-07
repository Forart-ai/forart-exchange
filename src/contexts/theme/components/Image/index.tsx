import React, { HTMLAttributes, ImgHTMLAttributes, useEffect, useRef, useState } from 'react'
import { ImageProps } from './types'
import { Skeleton } from '@mui/material'
import observerOptions from './options'
import Wrapper from './Wrapper'
import styled from 'styled-components'

const StyledImage = styled('img')<{ $borderRadius: number }>`
  height: 100%;
  left: 0;
  position: relative;
  top: 0;
  width: 100%;
  border-radius: ${({ $borderRadius }) => $borderRadius}px; 
  object-fit: cover;
`

const Image: React.FC<ImageProps> = ({ src, alt, width, height,variant,...props }) => {

  const imgEl = React.useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = React.useState(false)

  const onImageLoaded = () => setLoaded(true)

  React.useEffect(() => {
    const imgElCurrent = imgEl.current

    if (imgElCurrent) {
      imgElCurrent.addEventListener('load', onImageLoaded)
      return () => imgElCurrent.removeEventListener('load', onImageLoaded)
    }
  }, [imgEl])

  useEffect(() => {
  }, [loaded])

  return (
    <Wrapper  height={height} width={width} {...props}>
      <StyledImage ref={imgEl} src={src} alt={alt} $borderRadius={props?.borderRadius ?? 0}    style={loaded ? { display: 'inline-block' } : { display: 'none' }} />
      <Skeleton sx={{ backgroundColor: '#453e4d' }} animation={'wave'} variant={variant} width={'100%'} height={'100%'} style={!loaded ? { display: 'block' } : { display: 'none' }}  />
    </Wrapper>
  )
}

export default Image
