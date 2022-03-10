import React from 'react'
import styled from 'styled-components'
import { Avatar, Button, Form, Image, Input } from 'antd'
import { CommentOutlined ,SendOutlined, HeartOutlined  } from '@ant-design/icons'
import { PostForm } from './post'

const Wrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 410px;
  background-color: #1D222D;
  border-radius: 10px;
  margin: 5px 0;
  padding: 10px;
`

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const LeftArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const RightArea = styled.div`
  display: flex;
  align-items: center;
`

const UserInfo  = styled.div` 
  margin-left: 15px;
  
  .owner-name{
    font-size: 15px;
    color:#c2c2c2;
    font-weight: bold;
  }
  
  .signature {
    color: #989898;
  }
  
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const PostInfo = styled.div`
  color:#c2c2c2;
  display: flex;
  flex-direction: column;
  
  img {
    object-fit: cover;
    width: 100%;
    max-height: 400px;
  }
`

const Operator = styled.div`
  display: flex;
  height: 40px;
  margin: 12px 0;
  align-items: center;
  color: #54617B;

  span {
    font-size: 20px;
    color: #54617B;
    padding: 7px;
    border-radius: 50%;
    
    
  }
  
  .comment-box {
    display: flex;
    align-items: center;
    margin-right: 100px;
    
    :hover {
      color: #02a6f5;
      transition-duration: 0.5s;
      .anticon-comment  {
        color: #02a6f5;
        background-color: rgba(2,166,245, .2);
        transition-duration: 0.5s;
     }
    } 
  }

  .send-box {
    display: flex;
    align-items: center;
    margin-right: 100px;

    :hover {
      color: #17BF63;
      transition-duration: 0.5s;
      .anticon-send {
        color: #17BF63;
        background-color: rgba(23,191,99,.2);
        transition-duration: 0.5s;
      }
    }
  }

  .heart-box {
    display: flex;
    align-items: center;
    margin-right: 100px;

    :hover {
      color: #FF0055;
      transition-duration: 0.5s;
      .anticon-heart {
        color: #FF0055;
        background-color: rgba(255, 0 , 85 , .2);
        transition-duration: 0.5s;
      }
    }
  }
`

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px #0f131c solid;
  border-bottom: 1px #0f131c solid;
  padding: 10px 0;

  .ant-input-borderless {
    color: white;

  }
`

const ReplyContainer = styled.div`
margin-top: 14px`

export type CommentForm = {
  commentContent: string
}

const SocialIndex: React.FC = () => {
  const [form] = Form.useForm<CommentForm>()

  const formInitialValues: CommentForm = {
    commentContent: '',
  }

  return (
    <Wrapper>
      <TopContainer>
        <LeftArea>
          <Avatar size={'large'} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >M</Avatar>
          <UserInfo>
            <div className="owner-name"> momosama </div>
            <div className="signature"> hello world</div>
          </UserInfo>
        </LeftArea>
        <RightArea>
          <Button style={{ fontSize: '1em', padding: '0 5px' }}>Follow</Button>
        </RightArea>
      </TopContainer>

      <PostContainer>
        <PostInfo>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut dicta dolores illo incidunt minima nihil quibusdam quos similique
            vitae! Aliquid, blanditiis distinctio dolore doloribus, eaque earum facilis fugiat fugit incidunt itaque laborum laudantium magni natus
          </div>
          <Image src={'https://forart.mypinata.cloud/ipfs/QmX8iNqxTFh6FrMhTaEYuC9BAVyNKQETJzxenU4xHsjAa2'} />
        </PostInfo>
        <Operator >
          <div className="comment-box">
            <CommentOutlined />
            <div className="value">321</div>
          </div>
          <div className="send-box">
            <SendOutlined />
            <div className="value">321</div>
          </div>
          <div className="heart-box">
            <HeartOutlined />
            <div className="value">321</div>
          </div>

        </Operator>
      </PostContainer>

      <CommentContainer >
        <Avatar size={'large'} style={{ backgroundColor: '#FF468B', verticalAlign: 'middle' }} >Alice</Avatar>
        <Form form={form} initialValues={formInitialValues} style={{ width:'85%' }}>
          <Form.Item name="commentContent">
            <Input.TextArea bordered={false}  placeholder={'Share your feelings...'}  />
          </Form.Item>
        </Form>
        <Operator>
          <CommentOutlined />
          <SendOutlined />
        </Operator>
      </CommentContainer>

      <ReplyContainer>
        <>
          <LeftArea>
            <Avatar size={'large'} style={{ backgroundColor: '#0373be', verticalAlign: 'middle' }} >M</Avatar>
            <UserInfo>
              <div className="owner-name"> momosama </div>
              <div className="signature"> hello world</div>
            </UserInfo>
          </LeftArea>
          <PostInfo>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut dicta dolores illo incidunt minima nihil quibusdam quos similique

            </div>
            <Image src={'https://media1.giphy.com/media/XEZZliwJmGg6otzKK1/giphy.gif?cid=390f77acr2674gsc7qlnxdxzkja5zyyiv0o9jxoe42w1wff6&rid=giphy.gif&ct=g'} />
          </PostInfo>
          <LeftArea>
            <Avatar size={'large'} style={{ backgroundColor: '#0373be', verticalAlign: 'middle' }} >M</Avatar>
            <UserInfo>
              <div className="owner-name"> Derry </div>
              <div className="signature"> hello world</div>
            </UserInfo>
          </LeftArea>
          <PostInfo>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut dicta dolores illo incidunt minima nihil quibusdam quos similique

            </div>
          </PostInfo>
        </>
      </ReplyContainer>
    </Wrapper>
  )
}

export default SocialIndex
