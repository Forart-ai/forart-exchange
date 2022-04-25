import React, { useEffect, useState } from 'react'
import DefaultPageWrapper from '../../../../../components/default-page-wrapper'
import { styled } from '@mui/material'
import StageImage from '../../../../../assets/images/artistDetail/mint/stage.png'
import BlindBox from '../../../../../assets/images/artistDetail/mint/blind-box.png'
import CustomizedProgressBars from '../../../../../contexts/theme/components/Progress'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import SmallBox1 from '../../../../../assets/images/artistDetail/mint/Rectangle-1.png'
import SmallBox2 from '../../../../../assets/images/artistDetail/mint/Rectangle.png'
import SmallBoxBlur1 from '../../../../../assets/images/artistDetail/mint/blur1.png'
import SmallBoxBlur2 from '../../../../../assets/images/artistDetail/mint/blur2.png'

const MintWrapper = styled('div')`
  position: relative;
  margin-top: 30px;
  width: 100%;
  height: 750px;
  display: flex;
  justify-content: center;
  
  .stage, .blind-box {
    position: absolute;
  }
  
  .stage {
    z-index: 1;
    top: 60px;
  }
  .blind-box, .small-boxes {
    z-index: 2;
  }
  
  .blind-box {
    animation: bounce-up ease-in 4s  infinite;
  }

  .small-boxes {
    position: relative;
    
    .box1, .box2, .blur-box1, .blur-box2 {
      position: absolute;
    }
    
    .box1 {
      left: 320px; 
      bottom: 180px;
      animation: bounce-down ease-in 5s infinite;
    }
    
    .box2 {
      right: 330px;
      animation: bounce-up ease-in 3s infinite;
    }
    
    .blur-box1 {
      bottom: 180px;
      right: 280px;
      animation: bounce-down ease-in 4.3s infinite;
    }

    .blur-box2 {
      top: 160px;
      left: 260px;
      animation: bounce-down ease-in 3.6s infinite;
    }
    
  }
  
  
  @keyframes bounce-up {
    0% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(-12px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes bounce-down {
    0% {
      transform: translateY(0px);
    }
    60% {
      transform: translateY(22px);
    }

    100% {
      transform: translateY(0px);
    }
  }
`

const Operation = styled('div')`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  
  .progress {
    width: 50%;
    
    p {
      position: absolute;
      bottom: -5px;
      right: 50%;
    }
  }
  
`

const HypeteenMintPage:React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          return prev
        }

        return prev + 1
      })
    }, 150)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <DefaultPageWrapper>
      <MintWrapper>
        <img className={'blind-box'} src={BlindBox} />
        <img className={'stage'} src={StageImage} />
        <div className={'small-boxes'}>
          <img className={'box2'} src={SmallBox2} />
          <img className={'box1'} src={SmallBox1} />
          <img className={'blur-box1'} src={SmallBoxBlur1} />
          <img className={'blur-box2'} src={SmallBoxBlur2} />
        </div>
      </MintWrapper>
      <Operation>
        <div className={'progress'}>
          <CustomizedProgressBars style={{ height:'30px' }}  percent={0}  />
          <p>0 / 2000</p>
        </div>
        <CustomizeButton disabled={true} color={'secondary'} variant={'contained'}>Mint</CustomizeButton>
      </Operation>

    </DefaultPageWrapper>
  )
}

export default HypeteenMintPage
