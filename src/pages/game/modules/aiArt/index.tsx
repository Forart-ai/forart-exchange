import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStyledNFTsQuery } from '../../../../hooks/queries/useStyledNFTsQuery'

import { Button, Image as AntdImage } from 'antd'

import BannerImage from '../../../../assets/images/AIGen/ai-gen-banner.jpg'
import Merge from '../../../../assets/images/aiGenerator/merge.png'
import Add from '../../../../assets/images/aiGenerator/add.png'
import RightArrow from '../../../../assets/images/aiGenerator/arrow-right.png'
import StyleEx from '../../../../assets/images/aiGenerator/styleEx.png'
import ContentEx from '../../../../assets/images/aiGenerator/contentEx.png'
import ResultEx from '../../../../assets/images/aiGenerator/resultEx.png'
import Shadow from '../../../../assets/images/aiGenerator/shadow.png'
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons'
import { aiGeneratorStyle } from '../../../../apis/ai'
import { base64ToIPfsUri } from '../../../../utils'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useNFTsQuery } from '../../../../hooks/queries/useNFTsQuery'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import { Box, Checkbox, styled } from '@mui/material'
import { useMintResultQuery } from '../../../../hooks/queries/useMintResultQuery'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import { MintedNFTItem } from '../../../../types/coNFT'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'
import Flex from '../../../../contexts/theme/components/Box/Flex'

const Wrapper = styled('div')`
  width: 100%;
 
  margin-bottom: 300px;

`

const PageWrapper = styled('div')`
  max-width: 1870px;
  width: 95%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  

`

const Introduction = styled('div')`
  width: 100%;
  height: 220px;

  .title {
    font-size: 34px;
    margin: 30px 0;
    color: white;
    font-family: arialBold;
  }

 

  .description {
    color: ${({ theme }) => theme.palette.grey[400]};
    font-size: 16px;
  }


`

const Banner = styled('div')`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  

`

const GenerateResultContainer = styled('div')`
  width: 100% ;
  height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  

`

const SubTitle = styled('div')`
  font-size: 34px;
  margin: 30px 0;
  color: white;
  font-family: arialBold;

`

const StyledImageItem = styled('div')`
  width: 260px;
  height: 260px;
  border: 1px #999999 solid;
  padding: 10px;
  border-radius: 20px;
  background-color: rgba(255,255,255,.1);
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

`

const SelectedNftContainer = styled('div')`
  width: 260px;
  height: 260px;
  border: 1px #999999 solid;
  border-radius: 20px;
  background-color: rgba(255,255,255,.1);
  padding: 10px;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`

const ResultNFTContainer = styled('div')`
  width: 440px;
  height: 440px;
  border: 1px #999999 solid;
  border-radius: 20px;
  padding: 10px;
  
  .nft-border {
    img {
      width: 100%;
      height: 100%;
    }
  }
  
`

const SampleImage = styled('div')`
  width: 200px;
  height: 200px;
  border: 1px #999999 solid;
  border-radius: 20px;
  padding: 10px;
  background-color: rgba(255,255,255,.1);


  .sample {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  
 
  
`

const ExampleContainer =styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 40px;

  .plus-icon {
    width: 50px;
    height: 50px;
    background: url(${Add}) no-repeat;
    background-size: 100%;
    margin: 0 10px;
  }
 
  .equal-icon {
    width: 50px;
    height: 50px;
    background: url(${RightArrow}) no-repeat;
    background-size: 100%;
    margin: 0 10px;

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
        position:'absolute',
        top:'10px'
      }}
      >
        <Checkbox checked={checked} />
      </div>
    )
  }

  return (
    <StyledImageItem onClick={() => onSelect(src)}>
      <img src={src} />
      <SelectBtn />
    </StyledImageItem>

  )
}

const SelectableNFTList: React.FC<{selectedValue:string, onSelect:(_: string) => void, list?: string[]}> = ({
  selectedValue,
  onSelect,
  list
}) => {

  console.log(list)

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  return (

    <Swiper
      modules={[Pagination]}
      slidesPerView={isMobile? 1 : 6}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
    >
      {
        list?.map((item,key) => (
          <SwiperSlide key={key} style={{ display:'flex', justifyContent:'space-between', cursor:'pointer' }} >
            <SelectableNFTItem src={item} onSelect={onSelect} checked={selectedValue === item} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}

const SelectedNFT: React.FC< {content: string} >= ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })
  // console.log(isMobile)

  return (
    <SelectedNftContainer >

      {
        content &&  (
          <div className="mobile-style">
            <img src={content}  />
          </div>
        )
      }

    </SelectedNftContainer >
  )
}

const CreateButton: React.FC<{ onClick:() => void }> = ({ onClick }) => {

  return (
    <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div> <img src={Merge} style={{ width:'80px' }} /></div>
      <Button onClick={ onClick } > Generate Now! </Button>
    </div>
  )
}

const NewNFTContainer:React.FC<{ newNFTSrc?: string, generating?: boolean }> = ({ newNFTSrc,generating }) =>{

  const history = useHistory()

  const toCreateNFT = useCallback(async () => {
    history.push(`/NFTCreate?img=${newNFTSrc}`)
  },[newNFTSrc])

  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <ResultNFTContainer >
      <div className="nft-border">
        {
          generating && (
            <div>
              <div className="hint">This will take about 10~13sec</div>
            </div>

          )
        }

        {
          newNFTSrc &&  <img src={newNFTSrc}  />
        }

      </div>
    </ResultNFTContainer>
  )
}

const AiArt:React.FC = () => {
  // const [generating, setGenerating] = useState(false)
  const { account } = useSolanaWeb3()
  const [style, setStyle] = useState('')

  const [content, setContent] = useState('')

  // const [newNFT, setNewNFT] = useState('')

  const { data: coNftList } = useMintResultQuery({ wallet: account?.toBase58(), nft:'' } )

  const contentNft = useMemo(() => {
    return  coNftList?.map( (item:MintedNFTItem) => ({
      image: item.previewUrl
    }
    ))
  },[coNftList])

  // //
  //
  //
  // const generate = useCallback(async () => {
  //   setGenerating(true)
  //   const result = await aiGeneratorStyle(style,content)
  //   const uri = await base64ToIPfsUri(result.data)
  //   setNewNFT(uri)
  //   setGenerating(false)
  //   return uri
  // },[style,content])

  return (

    <Wrapper >
      <Banner>
        <img src={BannerImage} />
      </Banner>
      <PageWrapper>

        <Introduction>
          <div className="title">Style Transferred NFT</div>

          <div className="description">
            Al Generation uses artificial intelligence algorithms
            to extract the image style of Style Gene NFT and integrate it with the image of My
            NFT to reconstruct a brand-new NFT, which is a very interesting gameplay.
          </div>
        </Introduction>
        <Example />

        <Box sx={{ width: '100%', marginBottom: '50px' }}>
          <SubTitle>
            <div>Content</div>
          </SubTitle>

          <SelectableNFTList
            selectedValue={content}
            onSelect={v=> setContent(v)}
            list={contentNft?.map((item: { image: any}) => item?.image)}
          />
        </Box>

        <Box sx={{ width: '100%', marginBottom: '50px' }}>
          <SubTitle>
            <div>Style Gene</div>
          </SubTitle>

          <Flex alignItems={'center'} >
            <NewNFTContainer />
            <SelectedNFT content={content} />
          </Flex>
        </Box>

        {/*  <GenerateResultContainer >*/}
        {/*    <SelectedNFT style={style} content={content} />*/}
        {/*    <CreateButton onClick={ generate } />*/}
        {/*    <NewNFTContainer newNFTSrc={newNFT} generating={generating} />*/}
        {/*  </GenerateResultContainer>*/}
      </PageWrapper>

    </Wrapper>
  )
}

export default AiArt

