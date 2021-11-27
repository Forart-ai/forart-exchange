import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Button, Image as AntdImage, Radio } from 'antd'
import ai1 from '../../assets/images/AIGen/ai1.png'
import ai2 from '../../assets/images/AIGen/ai2.png'
import ai3 from '../../assets/images/AIGen/ai3.png'
import ai4 from '../../assets/images/AIGen/ai4.png'
import ai5 from '../../assets/images/AIGen/ai5.png'
import BannerImage from '../../assets/images/aiGenerator/banner.jpg'
import { LoadingOutlined } from '@ant-design/icons'

const Wrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  height: fit-content;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  .text {
    font-size: 18px;
    color: white;
  }

  @media screen and ( max-width: 1000px ){
    padding-top: 2rem;
    .title {
      font-weight: 550;
      font-size: 3rem;
      margin-bottom: 0;
    }
  }
`

const Title = styled.div`
  font-weight: 550;
  font-size: 46px;
  background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Banner = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  background: url(${BannerImage}) no-repeat center;
  margin-bottom: 20px;
`

const Introduction = styled.div`
  width: 100%;
  height: 200px;
  
  .title {
    width: fit-content;
    font-size: 38px;
    background-image: -webkit-linear-gradient(left, #00EBA4, #02A6F5);
    font-weight: 550;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 30px;
  }
  
  .sub-title {
    font-size: 24px;
    font-weight: 550;
    color: #02A6F5;
  }
  
  .description {
    color: #02A6F5;
    font-size: 16px;
  }
`

const SampleContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px red solid;
`

const SampleMain = styled.div`
  
`

const EnterContent = styled.div`
  display: flex;

  .enter {
    width: 150px;
    color: #ccc;
    font-size: 18px;
    font-weight: bolder;
    text-align: right;
  }
  
  .enterData {
    color: white;
    font-size: 18px;
    font-weight: bolder;
    margin-left: 30px;
  }
`
const SubTitle = styled.div`
  color: #00EBA4;
  width: fit-content;
  font-weight: 550;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 2px solid #00EBA4;
`

const SampleImg = styled.div`
  margin-top: 20px;
  display: flex;

  .enter {
    width: 150px;
    color: #ccc;
    font-size: 18px;
    font-weight: bolder;
    text-align: right;
    margin-right: 30px;
  }
`

const SampleImgItem = styled.div`
  margin-right: 10px;
  
  .item {
    width: 150px;
  }
`

const AIContentContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  border: 1px red solid;
  display: flex;
  flex-direction: column;
`

const StyledRadioGroup = styled(Radio.Group)`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const StyledRadio = styled(Radio)`
  background-color: #282c34;
  padding: 5px;
  border-radius: 10px;
  margin-top: 10px;
  
span {
  font-size: 18px;
  color: white;!important;
}
`

const StyledButton = styled(Button)`
  width: 150px;
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  justify-content: center;
  height: 40px;
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;
  margin-left: calc((100% - 150px) / 2) ;
  margin-top: 20px;
  
`

const SelectedImage = styled(AntdImage)`
  .ant-image.ant-image-error {
    background-color: #61dafb; !important;
  }
`

const ResultContainer = styled.div`
  height: 250px;
  border: 1px green solid;

  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;

  .loading {
    position: relative;
    bottom: 180px;
    left: 220px;
    font-size: 40px;
    color: #4779B5;
    z-index: 2;
  }
`

type mapItem = {
  contentText: string
}

const ContentItems: React.FC<{contentItems: mapItem[], onSelect:(_:string) => void}> = ({
  onSelect,
  contentItems,
}) => {

  return (
    <AIContentContainer>
      <SubTitle> Choose a sentence </SubTitle>
      <StyledRadioGroup >
        {
          contentItems?.map(item => (
            <div key={item.contentText} onClick={() => onSelect(item.contentText)}>
              <StyledRadio value={item.contentText}>{item.contentText}</StyledRadio>
            </div>
          ))
        }
      </StyledRadioGroup>
    </AIContentContainer>

  )
}

const AIGeneratorResultContainer: React.FC<{ resultImageSrc:string }> = ({ resultImageSrc }) => {
  return (
    <ResultContainer>
      <div className="nft-border">
        <SelectedImage src={resultImageSrc} width={1100} height={180} style={{ objectFit:'cover', borderRadius: '10px' }} />
      </div>
    </ResultContainer>
  )
}


const AIGen:React.FC = () => {
  const items: mapItem[] = [
    {
      contentText: 'an illustration of a baby daikon radish in a tutu walking a dog'
    },
    {
      contentText: 'an armchair in the shape of an avocado. . . .'
    },
    {
      contentText:'a store front that has the word ‘openai’ written on it. . . .'
    },
    {
      contentText: 'the exact same cat on the top as a sketch on the bottom'
    }
  ]
  const SampleImgs = [ai1, ai2, ai3, ai4, ai5]

  const [content,setContent] = useState('')

  const [resultImageSrc, setResultImageSrc] = useState('')

  return (
    <Wrapper >
      <Banner />
      <Introduction>
        <div className="title">AI-Driven Generating NFTs by Topic seed</div>
        <div className="sub-title">Description</div>
        <div className="description">
          Training is used to generate images from text descriptions using a text-image pair dataset
        </div>
      </Introduction>
      <SampleContent>
        <SampleMain>
          <EnterContent>
            <div className="enter">TEXT PROMPT</div>
            <div className="enterData">an illustration of a baby daikon radish in a tutu walking a dog</div>
          </EnterContent>
          <SampleImg>
            <div className="enter">AI-GENERATED IMAGES</div>
            <div style={{ display: 'flex' }}>
              {
                SampleImgs.map((item, index) => (
                  <SampleImgItem key={index}>
                    <img className="item" src={item} />
                  </SampleImgItem>
                ))
              }
            </div>
          </SampleImg>
        </SampleMain>
      </SampleContent>
      <ContentItems contentItems={items} onSelect={v => setContent(v)} />

      <StyledButton >Generate Now! {content}</StyledButton>
      <AIGeneratorResultContainer resultImageSrc={resultImageSrc} />
    </Wrapper>
  )
}

export default AIGen
