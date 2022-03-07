import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import AvatarIcon from '../../assets/images/nft-chatroom/avatar.svg'
import ImageIcon from '../../assets/images/nft-chatroom/image-fill.svg'
import Post from './post'

const Wrapper = styled.div`
  width: 100%;
  max-width: 65vw;
  height: 100vh;
  margin: auto;
  padding: 30px 20px;
  overflow-y: scroll;
  
 @media screen and (max-width: 1100px) {
   height: auto;
 } 
`

const SocialContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`

const NftChatroom: React.FC = () => {
  return (
    <Wrapper>
      <SocialContainer>
        <Post />
      </SocialContainer>
    </Wrapper>
  )
}

export default NftChatroom
