import React from 'react'
import AvatarIcon from '../../assets/images/social/avatar.svg'
import TextArea from 'antd/es/input/TextArea'
import ImageIcon from '../../assets/images/social/image-fill.svg'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'
import { NFTCreateForm } from '../nftCreate'
import usePost from '../../hooks/usePost'

const Wrapper = styled.div`
  height: 270px;
  width: 100%;
  min-width: 410px;
  background-color: #1D222D;
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
height: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: self-start;
  padding: 10px;
  width: 100%;
  
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

const  PostForm = styled(Form)`
    width: 100%;
`

export type PostForm = {
    postContent: string
}

const Post: React.FC = () => {
  const [form] = Form.useForm<PostForm>()

  const formInitialValues: PostForm = {
    postContent: '',

  }

  const { post } = usePost()

  return (
    <Wrapper>
      <div className="title">Post</div>
      <InputContainer>
        <img className="avatar" src={AvatarIcon} />
        <PostForm form={form} initialValues={formInitialValues} >
          <Form.Item name="postContent">
            <Input.TextArea bordered={false}  autoSize={{ minRows: 6 }} placeholder={'Share your feelings...'}  />
          </Form.Item>
        </PostForm>
      </InputContainer>
      <ToolsContainer>
        <div className="tools">
          <img  src={ImageIcon} />
        </div>
        <Button onClick={() => post(form)}>Sent</Button>
      </ToolsContainer>

    </Wrapper>
  )
}

export default Post
