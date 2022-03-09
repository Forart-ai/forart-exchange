import React from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'

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

const PostContainer = styled.div``

const PostInfo = styled.div`
  color:#c2c2c2;
`

const SocialIndex: React.FC = () => {
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
      </TopContainer>
      <PostContainer>
        <PostInfo>
          <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut dicta dolores illo incidunt minima nihil quibusdam quos similique

            vitae! Aliquid, blanditiis distinctio dolore doloribus, eaque earum facilis fugiat fugit incidunt itaque laborum laudantium magni natus
          </div>
        </PostInfo>
      </PostContainer>
    </Wrapper>
  )
}

export default SocialIndex
