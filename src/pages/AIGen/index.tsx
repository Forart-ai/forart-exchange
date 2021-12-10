import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Button, Form, Image as AntdImage, Input, Radio } from 'antd'
import ai1 from '../../assets/images/AIGen/ai1.png'
import ai2 from '../../assets/images/AIGen/ai2.png'
import ai3 from '../../assets/images/AIGen/ai3.png'
import ai4 from '../../assets/images/AIGen/ai4.png'
import ai5 from '../../assets/images/AIGen/ai5.png'
import BannerImage from '../../assets/images/AIGen/ai-gen-banner.jpg'
import { LoadingOutlined } from '@ant-design/icons'
import { aiGeneratorImage, aiGeneratorImageByContent } from '../../apis/ai'
import { base64ToIPfsUri, dictionaryToBase64 } from '../../utils'
import { NFTCreateForm } from '../nftCreate'


const Wrapper = styled.div`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  
  .text {
    font-size: 18px;
    color: white;
  }

  
`

const AIGenContent = styled(Form)`
  width: 100%;
  margin-top: 50px;
`

const AIGenContentItem = styled(Form.Item)`
  
  .ant-form-item-label > label {
    font-size: 18px;
    font-weight: 500;
    color: #02A6F5;
  }

  .ant-input {
    &::placeholder {
      color: #ccc;
    }

    height: 36px ;
    background: #2A2E35 !important;
    border-radius: 10px !important;
    border: none;

    font-size: 16px !important;
    font-weight: 500 !important;
    color: white !important;
    line-height: 20px !important;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1100px) {
    height: 160px;
  }
`

const Introduction = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  
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

  @media screen and (max-width: 1100px) {
    .title {
      font-size: 25px;
    }
    .sub-title {
      font-size: 22px;
    }
    .description {
      font-size: 14px;
    }
  }
`

const SampleContent = styled.div`
  width: 100%;
  margin-top: 30px;

`

const SampleMain = styled.div`
  display: flex;
  flex-direction: column;
  
`

const EnterContent = styled.div`
  display: flex;
  align-items: center;
  .enter {
    width: 200px;
    color: #02A6F5;
    font-size: 22px;
    red: left;
  }

  .enterData {
    color: #EADEDE;
    font-size: 18px;
    margin-left: 30px;
  }
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: start;
    
    .enter {
      font-size: 20px;
    }
    .enterData {
      margin: 0;
      font-size: 16px;
    }
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
    font-size: 22px;
    text-align: left;
    margin-right: 30px;
  }
  
  .sample-images {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    
    img {
      width: 150px;
      margin-right: 10px;
      border-radius: 10px;
    }
  }

  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: start;

    .enter {
      width: fit-content;
      font-size: 20px;
    }
    
    .sample-images {
      img{
        width: 15%;
        border-radius: 5px;
      }
    }
    
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
  border: none;
  color: white;
  border-radius: 10px;
  margin-left: calc((100% - 150px) / 2) ;
  font-size: 16px;
  
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


const Container = styled.div`
  width: 1100px;
  height: 100%;

  @media screen and  (max-width: 1100px) {
    width: 100vw !important;
    padding: 0 20px;
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

export type AIGenForm = {
  content:''
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

  const [content, setContent] = useState('')

  const [generating, setGenerating] = useState(false)

  const [resultImageSrc, setResultImageSrc] = useState(Array<any>())

  const [form] = Form.useForm<AIGenForm>()

  const formInitialValues: AIGenForm = {
    content: ''
  }

  const generate = useCallback(async () => {
    console.log(object, accessories, behavior)
    setGenerating(true)
    const result = await aiGeneratorImage(object, accessories, behavior)
    const uris = dictionaryToBase64(result.data)
    setResultImageSrc(uris)
    setGenerating(false)
    return uris
    // const uri = await base64ToIPfsUri(result.data.value)
  },
  [object, accessories, behavior]
  )

  const generateByContent = useCallback(async form => {
    const content = form.getFieldsValue().content
    setGenerating(true)
    console.log(content)
    const result = await aiGeneratorImageByContent(content)

    return
  },
  [form]
  )

  return (
    <Wrapper >
      <Container>
        <Banner>
          <img src={BannerImage} />
        </Banner>
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
              <div className="sample-images">
                {
                  SampleImgs.map((item, index) => (
                    <img key={index} className="item" src={item} />
                  ))
                }
              </div>
            </SampleImg>
          </SampleMain>
        </SampleContent>




        <AIGenContent form={form} colon={false} layout="horizontal" initialValues={formInitialValues} >
          <AIGenContentItem
            name="content"
            label="content"
            rules={[{ required: true, message: 'Content is Required!' }]}
          >
            <Input placeholder="Please enter a content" />
          </AIGenContentItem>
        </AIGenContent>

        {/*<StyledButton onClick={ generate } >*/}
        {/*  {*/}
        {/*    !generating ? 'Generate Now!' :*/}
        {/*      'Generating...'*/}
        {/*  }*/}
        {/*</StyledButton>*/}

        <StyledButton onClick={ () => generateByContent(form) } >
          {
            !generating ? 'Generate Now-!' :
              'Generating...'
          }
        </StyledButton>

        <AIGeneratorResultContainer resultImageSrc={resultImageSrc} generating={generating} />
      </Container>
    </Wrapper>
  )
}

export default AIGen
