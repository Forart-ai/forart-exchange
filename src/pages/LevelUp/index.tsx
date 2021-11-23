import React, { useState } from 'react'
import styled from '@emotion/styled'


const LevelUpContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media screen and (min-width : 300px) and (max-width: 1000px) {
    width: 100vw !important;
    height: 180vh;
    background-color: #0B111E;
    padding: 0;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  .introduce {
    text-align: center;
    color: #97BCF9;

    .title {
      font-weight: 550;
      font-size: 4.6rem;
      background-image: -webkit-linear-gradient(left, #aef9ff, #571eef);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 2rem;
    }
  }

  @media screen and (max-width: 1000px) {
    height: 20vh;
    .title {
      font-size: 10vw !important;
      text-align: center;
    }
    .introduce {
      padding: 0 8vw;
      font-size: 3.3vw !important;
      text-align: left;
    }
  }
`


const LevelUp:React.FC = () => {
  const [styleList, setStyleList] = useState<any>()
  const [generating, setGenerating] = useState(false)

  return (
    <LevelUpContainer >
      <Top >
        <div className="introduce" >
          <p className="title">Level Up</p>
          <div>Al Generation uses artificial intelligence algorithms to</div>
          <div>extract the image style of Style Gene NFT and integrate it with the image of My NFT to reconstruct a brand-new</div>
          <div>NFT, which is a very interesting gameplay.</div>
        </div>
      </Top>

    </LevelUpContainer>
  )
}

export default LevelUp

