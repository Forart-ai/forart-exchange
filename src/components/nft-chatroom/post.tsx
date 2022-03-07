import React from 'react'
import AvatarIcon from '../../assets/images/nft-chatroom/avatar.svg'
import TextArea from 'antd/es/input/TextArea'
import ImageIcon from '../../assets/images/nft-chatroom/image-fill.svg'
import { Button } from 'antd'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 20%;
  width: 50%;
  min-width: 410px;
  background-color: #222528;
  border-radius: 10px;
  
  .title {
    font-size: 1.8em;
    padding: 10px 30px;
    color: white;
    border-bottom: 2px #FF468B solid;
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
  
  img {
    width: 50px;
  }
  
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

const Post: React.FC = () => {
  return (
    <Wrapper>
      <div className="title">Post</div>
      <InputContainer>
        <img className="avatar" src={AvatarIcon} />
        <TextArea bordered={false}  autoSize={{ minRows: 6 }} placeholder={'Share your feelings...'}  />
      </InputContainer>
      <ToolsContainer>
        <div className="tools">
          <img  src={ImageIcon} />
        </div>
        <Button>Sent</Button>
      </ToolsContainer>

    </Wrapper>
  )
}

export default Post
