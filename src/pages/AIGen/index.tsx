import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Image as AntdImage, Radio } from 'antd'
import ai1 from '../../assets/images/AIGen/ai1.png'
import ai2 from '../../assets/images/AIGen/ai2.png'
import ai3 from '../../assets/images/AIGen/ai3.png'
import ai4 from '../../assets/images/AIGen/ai4.png'
import ai5 from '../../assets/images/AIGen/ai5.png'
import BannerImage from '../../assets/images/AIGen/ai-gen-banner.jpg'
import { LoadingOutlined } from '@ant-design/icons'
import { aiGeneratorImage } from '../../apis/ai'
import { base64ToIPfsUri, dictionaryToBase64 } from '../../utils'


const Wrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  height: 2000px;
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
  background-size: 100%;
  margin-bottom: 20px;
`

const Introduction = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 30px;
  
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
`

const SampleMain = styled.div`
  
`

const EnterContent = styled.div`
  display: flex;
align-items: center;
  .enter {
    width: 200px;
    color: #02A6F5;
    font-size: 25px;
    red: left;
  }

  .enterData {
    color: #EADEDE;
    font-size: 18px;
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
    width: 200px;
    color: #02A6F5;
    font-size: 24px;
    text-align: left;
    margin-right: 30px;
  }
`

const SampleImgItem = styled.div`
  margin-right: 10px;
  
  .item {
    width: 150px;
    border-radius: 10px;
  }
`

const AIContentContainer = styled.div`
  margin-top: 40px;
  width: 100%;
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
  margin-top: 25px;
  background-color: #282c34;
  height: 525px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  align-items: center;
  
  .nft-border {
    padding: 20px 30px;
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .empty {
      padding: 0;
      height: 0;
      width: 110px;
    }
    
  }
  
  img {
    width: 110px;
    border-radius: 10px;
  }

  .loading {
    position: absolute;
    font-size: 40px;
    color: #4779B5;
    z-index: 44;
  }
`

type objectItem = {
  object: string,
}

type accessoriesItem = {
  accessories: string
}

type behaviorItem = {
  behavior: string
}

const ObjectItems: React.FC<{objectItems: objectItem[], onSelect:(_:string) => void}> = ({
  onSelect,
  objectItems,
}) => {

  return (
    <AIContentContainer>
      <SubTitle> Choose an object </SubTitle>
      <StyledRadioGroup  >
        {
          objectItems?.map(item => (
            <div key={item.object} onClick={() => onSelect(item.object)}>
              <StyledRadio value={item.object}>{item.object}</StyledRadio>
            </div>
          ))
        }
      </StyledRadioGroup>
    </AIContentContainer>

  )
}

const AccessoriesItems: React.FC<{ accessoriesItems: accessoriesItem[], onSelect:(_:string) => void}> = ({
  onSelect,
  accessoriesItems,
}) => {

  return (
    <AIContentContainer>
      <SubTitle> Choose an accessories </SubTitle>
      <StyledRadioGroup >
        {
          accessoriesItems?.map(item => (
            <div key={item.accessories} onClick={() => onSelect(item.accessories)}>
              <StyledRadio value={item.accessories}>{item.accessories}</StyledRadio>
            </div>
          ))
        }
      </StyledRadioGroup>
    </AIContentContainer>

  )
}

const BehaviorItems: React.FC<{ behaviorItems: behaviorItem[], onSelect:(_:string) => void}> = ({
  onSelect,
  behaviorItems,
}) => {

  return (
    <AIContentContainer>
      <SubTitle> Choose an behavior </SubTitle>
      <StyledRadioGroup     >
        {
          behaviorItems?.map(item => (
            <div key={item.behavior} onClick={() => onSelect(item.behavior)}>
              <StyledRadio value={item.behavior}>{item.behavior}</StyledRadio>
            </div>
          ))
        }
      </StyledRadioGroup>
    </AIContentContainer>

  )
}

const AIGeneratorResultContainer: React.FC<{ resultImageSrc: any[], generating: boolean }> = ({ resultImageSrc,
  generating }) => {
  return (
    <ResultContainer>
      {
        generating && ( <LoadingOutlined className="loading" />)
      }
      <div className="nft-border">
        {
          resultImageSrc?.map((item,index) => (
            <div key={index}>
              <img src={resultImageSrc[index]} />
            </div>
          ))
        }
        {
          new Array(9).fill({}).map((_, index) => (
            <div className="empty" key={index} />
          ))
        }
        {/*<SelectedImage src={resultImageSrc} width={1100} height={180} style={{ objectFit:'cover', borderRadius: '10px' }} />*/}
      </div>
    </ResultContainer>
  )
}


const AIGen:React.FC = () => {
  const objectMap: objectItem[] = [
    { object: 'an avocado' },

    { object: 'an baby fox' }
  ]

  const accessoriesMap: accessoriesItem[] = [
    { accessories: 'in a christmas sweater' },

    { accessories: 'with sunglasses' }
  ]

  const behaviorMap: behaviorItem[] = [
    { behavior: 'playing chess' },

    { behavior: 'flying a kite' }
  ]

  const SampleImgs = [ai1, ai2, ai3, ai4, ai5]

  const [object, setObject] = useState('')

  const [accessories, setAccessories] = useState('')

  const [behavior, setBehavior] = useState('')

  const [generating, setGenerating] = useState(false)

  const [resultImageSrc, setResultImageSrc] = useState(Array<any>())

  const generate = useCallback(async () => {
    console.log(object, accessories, behavior)
    setGenerating(true)
    const result = await aiGeneratorImage(object, accessories, behavior)
    // const result = await fetch('http://175.27.190.185:8898/genImage', {
    //   method: 'post',
    //   body: JSON.stringify({
    //     object,
    //     accessories,
    //     behavior
    //   })
    // })
    const uris = dictionaryToBase64(result.data)
    setResultImageSrc(uris)
    setGenerating(false)
    return uris
    // const uri = await base64ToIPfsUri(result.data.value)
  },
  [object, accessories, behavior]
  )




  return (
    <Wrapper >
      <Banner />
      <Introduction>
        <div className="title">GAN-Driven NFT Generation</div>
        <div className="sub-title">Description</div>
        <div className="description">
          Different from traditional NFT creation, GAN-Driven NFT
          Generator can directly transform it into art according to
          the needs and description of the artist, simple and straightforward.
          You only need to simply describe what you want to see and AI-Driven NFT
          Generator transforms your words into art. The result may exceed your imagination,
          or even your cognition. It may be abstract art or a representation of reality. It
          may also be the fusion of imagination and reality.
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
      <ObjectItems objectItems={objectMap} onSelect={v => setObject(v)} />

      <AccessoriesItems accessoriesItems={accessoriesMap} onSelect={ v => setAccessories(v) } />

      <BehaviorItems behaviorItems={behaviorMap} onSelect={ v => setBehavior(v) } />

      <StyledButton onClick={ generate } >
        {
          !generating ? 'Generate Now!' :
            'Generating...'
        }
      </StyledButton>

      <AIGeneratorResultContainer resultImageSrc={resultImageSrc} generating={generating} />
    </Wrapper>
  )
}

export default AIGen
