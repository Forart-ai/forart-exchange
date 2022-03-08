import React from 'react'
import styled from 'styled-components'
import { Avatar } from 'antd'

const Wrapper = styled.div`
  height: fit-content;
  width: 100%;
  min-width: 410px;
  background-color: #1D222D;
  border-radius: 10px;
  margin: 5px 0;
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
  
`

const SocialIndex: React.FC = () => {
  return (
    <Wrapper>
      <TopContainer>
        <LeftArea>
          <Avatar size={'large'} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >M</Avatar>
          <UserInfo>
            <b> momosama </b>
            <div className="signature"> hello world</div>
          </UserInfo>
        </LeftArea>
      </TopContainer>
    </Wrapper>
  )
}

export default SocialIndex
