import React, { useCallback, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useStyledNFTsQuery } from '../../hooks/queries/useStyledNFTsQuery'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Button, Checkbox, Image as AntdImage, Popover } from 'antd'
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/modules/navigation/navigation.scss'
import BannerImage from '../../assets/images/AIGen/ai-gen-banner.jpg'
import Merge from '../../assets/images/aiGenerator/merge.png'
import Add from '../../assets/images/aiGenerator/add.png'
import RightArrow from '../../assets/images/aiGenerator/arrow-right-fill.png'
import StyleEx from '../../assets/images/aiGenerator/styleEx.jpg'
import ContentEx from '../../assets/images/aiGenerator/contentEx.jpg'
import ResultEx from '../../assets/images/aiGenerator/resultEx.jpg'
import { LoadingOutlined } from '@ant-design/icons'
import { aiGeneratorStyle } from '../../apis/ai'
import {  base64ToIPfsUri } from '../../utils'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useNFTsQuery } from '../../hooks/queries/useNFTsQuery'


SwiperCore.use([Navigation, EffectCoverflow, Pagination])



const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;

  @media screen and  (max-width: 1100px) {
    width: 100vw !important;
    background-color: #0B111E;
    padding: 0;
    height: 1700px;
  }
`

const GenContainer = styled.div`
  width: 1100px;
  height: 100%;

  @media screen and  (max-width: 1100px) {
    width: 100vw !important;
    padding: 0 20px;
  }
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
  
  @media screen and (max-width: 1100px) {
    .title {
      font-size: 26px;
    }
    .sub-title {
      font-size: 22px;
    }
    .description {
      font-size: 14px;
    }
  }
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

const LeftArea = styled.div`
  width: 100%;
  margin-bottom: 50px;
`

const GenerateResultContainer = styled.div`
  width: 100% ;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60px;
  
  
  
  @media screen and (max-width: 1100px) {
    height: 300px;
    flex-direction: column;
  }
`

const SubTitle = styled.div`
  color: #00EBA4;
  width: fit-content;
  font-weight: 550;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 2px solid #00EBA4;
   
  @media screen and (max-width: 1100px) {
    font-size: 20px;
  }
`


const StyledImage = styled(AntdImage)`
  display: flex;
  justify-content: center;
  user-select: none;
`

const SelectedImage = styled(AntdImage)`
  .ant-image.ant-image-error {
    background-color: #61dafb; !important;
  }
`


const SeedNFTColumn = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  
  @media screen and (max-width: 1100px) {
    width: 100%;
    flex-direction: row;
    
    .mobile-style {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
`

const MergeIcon = styled.div`
  width: 100px;
  height: 100px;
  background: url(${Merge}) no-repeat ;
  background-size: 100%;

  @media screen and (max-width: 1100px) {
   display: none;
  }
`

const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
  height: 40px;
  border: none;
  color: white;
  border-radius: 10px;
  margin-top: 25px;
`

const ResultNFTColumn = styled.div`
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  
  .nft-border {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
  
  .loading {
    position: absolute;
    top:240px;
    left: 180px;
    font-size: 40px;
    color: #4779B5;
    z-index: 2;
  }
  
  @media screen and (max-width: 1100px) {
    margin-top: 20px;
    width: 100%;
    
    .nft-border {
      width: 100%;
    }
    
    .loading {
      top: 35%;
      left: 45%;
    }
  }
`

const SampleImage = styled.div`
  width: 130px;
  height: 130px;
  object-fit: contain;
  
  .sample {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: contain;
    background-color: #2A2E35;
  }
  
  @media screen and (max-width: 1100px) {
    height: 80px;
    width: 80px;
  }
  
`

const ExampleContainer =styled.div`
  width: 55%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  

  .plus-icon {
    width: 50px;
    height: 50px;
    background: url(${Add}) no-repeat;
    background-size: 100%;
  }
 
  .equal-icon {
    width: 50px;
    height: 50px;
    background: url(${RightArrow}) no-repeat;
    background-size: 100%;
  }
 
  
  @media screen and (max-width: 1100px) {
    width: 100%;
    margin-top: 40px;

    .plus-icon, .equal-icon {
      width: 30px;
      height: 30px;
    }

  }
  
`

const Example: React.FC = () =>{
  return (
    <ExampleContainer>
      <SampleImage>
        <img className="sample" src={StyleEx} />
      </SampleImage>

      {/*<div className="style-image" />*/}
      <div className="plus-icon" />
      <SampleImage>
        <img className="sample" src={ContentEx} />
      </SampleImage>
      {/*<div className="content-image" />*/}
      <div className="equal-icon" />
      {/*<div className="result-image" />*/}
      <SampleImage>
        <img className="sample" src={ResultEx} />
      </SampleImage>

    </ExampleContainer>
  )
}


const SelectableNFTItem: React.FC<{ src: string, checked?: boolean, onSelect:(_:string) => void}> = ({
  src,
  checked,
  onSelect
}) => {
  const SelectBtn: React.FC = () => {
    return (
      <div style={{
        position:'relative',
        bottom:'150px',
        left:'10px'
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(src)}
    >
      <StyledImage width={160}
        height={160}
        src={src}
        preview={false}
        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '10px', display:'flex', justifyContent:'center' }}
      />
      <SelectBtn />
    </div>
  )
}

const SelectableNFTList: React.FC<{selectedValue:string, onSelect:(_: string) => void, list?: string[]}> = ({
  selectedValue,
  onSelect,
  list
}) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={isMobile? 1 : 5}
      navigation
      spaceBetween={20}
    >
      {
        list?.map((item,key) => (
          <SwiperSlide key={key} style={{ display:'flex', justifyContent:'center' }} >
            <SelectableNFTItem src={item} onSelect={onSelect} checked={selectedValue === item} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}

const SelectedNFT: React.FC< {style: string, content: string} >= ({ style, content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })
  console.log(isMobile)

  return (
    <SeedNFTColumn >
      {
        isMobile ? (
          <div className="mobile-style">
            <SelectedImage src={style} width={150} height={150} style={{ objectFit:'cover', borderRadius: '10px' }} />
            <SelectedImage src={content} width={150} height={150} style={{ objectFit:'cover', borderRadius: '10px' }}  />
          </div>

        ):
          (
            <div>
              <SelectedImage src={style} width={230} height={230} style={{ objectFit:'cover', borderRadius: '10px' }} />
              <SelectedImage src={content} width={230} height={230} style={{ objectFit:'cover', borderRadius: '10px' }}  />
            </div>
          )
      }
    </SeedNFTColumn>
  )
}

const CreateButton: React.FC<{ onClick:() => void }> = ({ onClick }) => {

  return (
    <div>
      <MergeIcon />
      <StyledButton onClick={ onClick } > Generate Now! </StyledButton>
    </div>
  )
}

const NewNFTContainer:React.FC<{ newNFTSrc: string, generating: boolean }> = ({ newNFTSrc,generating }) =>{

  const history = useHistory()

  const toCreateNFT = useCallback(async () => {
    history.push(`/NFTCreate?img=${newNFTSrc}`)
  },[newNFTSrc])

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })


  return (
    <ResultNFTColumn >
      <div className="nft-border">
        {
          generating && (
            <div>
              <LoadingOutlined className="loading" />
              <div style={{ color:'white' }}>This will take about 10~13sec</div>

            </div>

          )
        }

        {
          !isMobile &&  <SelectedImage src={newNFTSrc} width={400} height={400} style={{ objectFit:'cover', borderRadius: '10px' }} />
        }

        {
          isMobile &&  <SelectedImage src={newNFTSrc} width={'100%'} height={200} style={{ objectFit:'cover', borderRadius: '10px' }} />
        }

        <StyledButton onClick={ toCreateNFT }>Create NFT!</StyledButton>

      </div>
    </ResultNFTColumn>
  )
}

const AIGeneration:React.FC = () => {

  const [generating, setGenerating] = useState(false)

  const [style, setStyle] = useState('')

  const [content, setContent] = useState('')

  const [newNFT, setNewNFT] = useState('')

  const { data: nftList } = useNFTsQuery({
    current: 1,
    size: 10,
    searchKey:'',
    transactionStatus: 0,
    typeChain:'Ethereum'
  })

  const { data: styleList } = useStyledNFTsQuery()



  const contentNft = useMemo(() => {
    return  nftList?.records.map( value => ({
      image: value.image
    }
    ))
  },[nftList])

  // const generate = async () => {
  //   setGenerating(true)
  //   const result = await aiGeneratorStyle(style, content)
  //   const uri = await base64ToIPfsUri(result.data)
  //   setNewNFT(uri)
  //   console.log(newNFT)
  // }

  const generate = useCallback(async ()=> {
    setGenerating(true)
    const result = await aiGeneratorStyle(style,content)
    const uri = await base64ToIPfsUri(result.data)
    setNewNFT(uri)
    setGenerating(false)
    return uri
  },[style,content])

  // useEffect(() => {
  //   setStyleList(styledNFTs)
  // },[styledNFTs])


  return (
    <Wrapper >
      <GenContainer>
        <Banner>
          <img src={BannerImage} />
        </Banner>
        <Introduction>
          <div className="title">Style Transferred NFT</div>
          <div className="sub-title">Description</div>
          <div className="description">Al Generation uses artificial intelligence algorithms
            to extract the image style of Style Gene NFT and integrate it with the image of My
            NFT to reconstruct a brand-new NFT, which is a very interesting gameplay.
          </div>
        </Introduction>
        <Example />

        <LeftArea>
          <SubTitle>Style Gene</SubTitle>
          <SelectableNFTList
            selectedValue={style}
            onSelect={v=> setStyle(v)}
            list={styleList?.map((style: { image: any}) => style?.image)}
          />

          <SubTitle>Content</SubTitle>
          <SelectableNFTList
            selectedValue={content}
            onSelect={v=> setContent(v)}
            list={contentNft?.map((nft: { image: any}) => nft?.image)}
          />

        </LeftArea>


        <GenerateResultContainer >
          <SelectedNFT style={style} content={content} />
          <CreateButton onClick={ generate } />
          <NewNFTContainer newNFTSrc={newNFT} generating={generating} />
        </GenerateResultContainer>
      </GenContainer>

    </Wrapper>
  )
}

export default AIGeneration

