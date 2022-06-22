import React, { useCallback } from 'react'
import { styled,  } from '@mui/material'
import HypeteenIcon from '../../assets/images/artistDetail/hypeteenIcon.png'
import Background from '../../assets/images/coPools/hypeteen-background.png'
import GoblinAvatar from '../../assets/images/goblin/goblin-avatar.webp'
import CustomizeButton from '../../contexts/theme/components/Button'
import { useFreeMint } from '../../hooks/programs/useFreeMint'

const Wrapper = styled('div')`
  min-height: 100vh;
  width: 100%;
`

const BackgroundImage = styled('div')`
  height: 470px;
  width: 100%;
    // background: url(${Background}) no-repeat center;
  background-color: #18182a;
  position: relative;
  background-size: cover;
  text-align: center;
 


 
`

const MainContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px 40px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 10px;
  }
`

const MainArea = styled('div')`
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;
  
    img {
      width: 180px;
      object-fit: cover;
      border-radius: 50%;
    }
    
    span {
      font-family: KronaOne-Regular;
      color: #ffffff;
      font-size: 34px;
    }
  
  .info-message {
    margin-top: 20px;
    text-align: center;
    color: ${({ theme }) => theme.palette.grey[400]};
    font-size: 20px;
  }
  
  @media screen and (max-width: 1080px) {
    height: 70%;
    .top {
      flex-direction: column;

      span {
        margin-left: 0;
        font-family: inter-extraBold;
        color: #ffffff;
        font-size: 1.4em;
      }
    }

    .info-message {
      text-align: center;
      padding: 0 10px;
      font-size: 1.2em;
    }
  }
`

const Goblin:React.FC = () => {

  const { getFreeMintToken } = useFreeMint()

  return (
    <Wrapper>
      <BackgroundImage>
        <MainContainer >

          <MainArea>
            <img src={GoblinAvatar} />
            <span> Goblinai.sol</span>
            <div className="info-message">
              AAAAAAAUUUUUGGGHHHHH gobblins goblinns GOBLINNNNNNNNns wekm ta goblintown yoo sniksnakr DEJEN RATS oooooh rats are yummmz dis a NEFTEEE O GOBBLINGS on da BLOKCHIN wat?
            </div>
          </MainArea>

        </MainContainer>
        <CustomizeButton variant={'contained'} onClick={getFreeMintToken}>FREE MINT</CustomizeButton>

      </BackgroundImage>
    </Wrapper>

  )
}

export default Goblin
