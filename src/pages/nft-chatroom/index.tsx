import React from 'react'
import styled from 'styled-components'
import Post from './post'
import SocialIndex from './socialIndex'
import { Avatar } from 'antd'

const Wrapper = styled.div`
  width: 100%;
  max-width: 50vw;
  height: 100vh;
  margin: auto;
  padding: 20px 20px 80px 20px;
  overflow-y: scroll;
  
 @media screen and (max-width: 1100px) {
   height: auto;
 } 
`

const SocialContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

`

const Filter = styled.div`
    width: 100%;
  height: 40px;
  background: #1D222D;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff0f6;
  font-size: 1.3em;
  margin: 10px 0;
  border-radius: 5px;
`

const RankingContainer = styled.div`
  width: 40%;
  background-color: #1D222D;
  border-radius: 10px;
  height: fit-content;
  padding: 10px 20px;

  .title {
    color: #ffffff;
    font-size: 1.7em;
  }
`

const RankRow = styled.div`
  display: flex;
  flex-direction: column;
  color: #c2c2c2;
  margin: 10px 0;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    
  }
  .right {
    display: flex;
    align-items: center;
  }
`

const Message = styled.div`
  width: 100%;
  text-align: center;
  color: #c2c2c2;
  font-size: 2em;
  font-weight: bolder;
  margin: 10px 0;
`

const NftChatroom: React.FC = () => {
  return (
    <Wrapper>
      <Message>Coming soon!</Message>
      <div style={{ display:'flex', justifyContent: 'space-between' }}>
        <SocialContainer>
          <Post />
          {/*<Filter >ALL</Filter>*/}
          <SocialIndex />
        </SocialContainer>
        <RankingContainer>
          <div className="title">Top Creators</div>
          {
            new Array(8).fill({}).map((_, index) => (
              <RankRow key={index}>
                <div className="row">
                  <div className="right">
                    <Avatar size={'large'} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >Momo</Avatar>
                    <div style={{ marginLeft:'10px' }}>Monica</div>
                  </div>
                  <b>199</b>
                </div>

              </RankRow>
            ))
          }
        </RankingContainer>
      </div>
    </Wrapper>
  )
}

export default NftChatroom
