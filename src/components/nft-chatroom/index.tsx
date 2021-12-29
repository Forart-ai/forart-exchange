import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import AvatarIcon from '../../assets/images/nft-chatroom/avatar.svg'
import ImageIcon from '../../assets/images/nft-chatroom/image-fill.svg'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  height: fit-content;
  margin: auto;
  //padding-bottom: 50px;
  padding: 30px 20px;
  min-height: 100vh;
  
 @media screen and (max-width: 1100px) {
   height: auto;
 } 
`
const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`
const SocialContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PostContainer = styled.div`
  height: 20%;
  width: 50%;
  min-width: 410px;
  background-color: #222528;
  border-radius: 20px;
  
  .title {
    font-size: 1.8em;
    padding: 10px 30px;
    color: white;
    border-bottom: 2px #1C1C1D solid;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: self-start;
  padding: 10px;
  
  .ant-input-borderless {
    color: white;
    
  }
`
const ToolsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-between;
  padding: 10px;

  .tools {
    cursor: pointer;


    img {
      border-radius: 50%;
      background-color: #25354f;
      padding: 2px;
      width: 30px;
    }
  }
`

const NftChatroom: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <SocialContainer>
          <PostContainer>
            <div className="title">Post</div>
            <InputContainer>
              <img className="avatar" src={AvatarIcon} />
              <TextArea bordered={false}  autoSize={{ minRows: 6 }}  />
            </InputContainer>
            <ToolsContainer>
              <div className="tools">
                <img  src={ImageIcon} />
              </div>
              <Button>Sent</Button>
            </ToolsContainer>

          </PostContainer>
        </SocialContainer>
      </Container>
    </Wrapper>
  )
}

export default NftChatroom
