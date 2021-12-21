import styled from 'styled-components'
import { Image } from 'antd'

export const MintWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

`

export const TopContainer = styled.div `
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;

`

export const BodyContent = styled.div `
  width: 50%;
  height: auto;
  display: flex;
  background: #070E1E;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  padding: 20px;
`

export const SwiperList = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  
`

export const ImageBorder = styled.div`
  width: 100%;
  
`

export const StyledImage = styled(Image)`
  background: #0f1b39;
  border-radius: 10px;
`

export const SelectedBody = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f1b39;
  border-radius: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`
