import React from 'react'
import styled from 'styled-components'
import { UserDetail } from '../../types/userDetail'
import { useArtistDetailQuery } from '../../hooks/queries/useArtistDetailQuery'

import HeaderBack from '../../assets/images/artistDetail/cool-background.png'
import { Avatar } from 'antd'


const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  height: fit-content;
  margin: auto;
  padding-bottom: 50px;
`

const ArtistDetailContainer = styled.div`
  max-width: 1900px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  //border: blue 1px solid;
`

const HeaderContainer = styled.div<{backgroundImage?: string}>`
  width: 100%;
  height: 800px;
  border-radius: 20px;
  margin-top: 10px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //background: #2A2E35;
  padding: 24px 48px;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
  


  ${props => props.backgroundImage && `
 background: url(${HeaderBack}) no-repeat center;
 background-size: cover;
 `
}
  

`

const ArtistInfo = styled.div`
  width: 100%;
  height: 70%;
  //border: 1px red solid;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 40px;

  .username {
    font-size: 2rem;
    color: #fff;
  }

  .slogan {
    background: linear-gradient(90deg, #12dbe4, #02fbab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.25rem;
    text-align: center;
  }

  .describe {
    color: #b2b2b2;
    font-size: 1rem;
    text-align: center;
  }
`

const FollowersInfo = styled.div` 
  width: 100%;
  height: 12%;
  background: rgba(14,22,39,.85);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 15px 20px;
`

const LeftArea = styled.div` 
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  
  .label {
    font-size: 1rem !important;
  }
  .value{
    font-size: 1.5rem !important;
  }
`


const RightArea = styled.div` 
  width: 75%;
  height: 100%;
  display: flex;
  //padding: 16px;
  
  .followers {
    width: 100%;
    position: relative;
    min-height: 50px;
    overflow: hidden; !important;
    
    .followers-icon {
      overflow: hidden; !important;
      width: 100%;
    }

    .followers-icon-inner {
      display: flex;
      -webkit-animation: scrollDown 200s alternate;
      animation: scrollDown 20s alternate;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
 
      .is-48 {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin: 0 5px;
      }
    }

    @keyframes scrollDown {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    
  }

  
  

`




const UserInfo: React.FC<{ userData?:UserDetail }> = ({ userData }) => {

  // console.log(userData)
  return (
    <HeaderContainer backgroundImage={userData?.backgroundImage}>
      <ArtistInfo>
        <Avatar size={ 64 } src={userData?.avatar} />
        <div className="username">{userData?.username}</div>
        <div className="slogan">{userData?.slogan}</div>
        <p className="describe">{userData?.describe}</p>
      </ArtistInfo>
      <FollowersInfo>
        <LeftArea >
          <div className="value"> {userData?.followers.length}</div>
          <div className="label"> Followers </div>
        </LeftArea>
        <RightArea>
          <div className="followers" >
            <div className="followers-icon">
              <div className="followers-icon-inner">
                {
                  userData?.followers.map((item:string, index:number) => (
                    <img className="is-48" src={item} key={index} />
                  ))
                }
              </div>
            </div>
          </div>
        </RightArea>
      </FollowersInfo>
    </HeaderContainer>
  )
}


const ArtistDetail: React.FC = () => {

  const { data: userData } = useArtistDetailQuery()

  return (
    <Wrapper>
      <ArtistDetailContainer>
        <UserInfo userData={userData} />

      </ArtistDetailContainer>
    </Wrapper>
  )

}


export default ArtistDetail
