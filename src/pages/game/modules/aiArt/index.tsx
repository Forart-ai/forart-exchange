import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useStyledNFTsQuery } from '../../../../hooks/queries/useStyledNFTsQuery'

import BannerImage from '../../../../assets/images/game/aiart-banner.webp'
import Merge from '../../../../assets/images/aiGenerator/merge.png'
import Add from '../../../../assets/images/aiGenerator/add.png'
import RightArrow from '../../../../assets/images/aiGenerator/arrow-right.png'
import StyleEx from '../../../../assets/images/aiGenerator/styleEx.png'
import ContentEx from '../../../../assets/images/aiGenerator/contentEx.png'
import ResultEx from '../../../../assets/images/aiGenerator/resultEx.png'
import GenerateBackground from '../../../../assets/images/game/generate-background.png'
import { aiGeneratorStyle } from '../../../../apis/ai'
import { base64ToIPfsUri } from '../../../../utils'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useNFTsQuery } from '../../../../hooks/queries/useNFTsQuery'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import { Box, Checkbox, styled } from '@mui/material'
import { useMintResultQuery } from '../../../../hooks/queries/useMintResultQuery'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import { MintedNFTItem } from '../../../../types/coNFT'

import Flex from '../../../../contexts/theme/components/Box/Flex'
import { SelectContentType } from '../../../coNft/components/filter-operations/selectors'
import SelectableNFTList from '../../components/aiArt/selectableNftList'
import { useOwnedNFTsQuery } from '../../../../hooks/queries/useOwnedNFTsQuery'
import { MetadataResult } from '../../../../utils/metaplex/metadata'
import CustomizeButton from '../../../../contexts/theme/components/Button'
import { PulseLoader, SyncLoader } from 'react-spinners'
import CustomizedProgressBars from '../../../../contexts/theme/components/Progress'
import CustomizedSlider from '../../../../contexts/theme/components/Slider'

const Wrapper = styled('div')`
  width: 100%;

`

const PageWrapper = styled('div')`
  max-width: calc(100vw - 240px);
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
  height: 340px;
  border-radius: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  

`

const SubTitle = styled('div')`
  font-size: 34px;
  margin: 30px 0;
  color: white;
  font-family: arialBold;
  display: flex;
  align-items: center;
  
  span {
    margin-right: 20px;
  }

`

const SelectedNftContainer = styled('div')`
  width: 240px;
  height: 240px;
  border: 1px #999999 solid;
  border-radius: 20px;
  background-color: rgba(255,255,255,.1);
  padding: 10px;
  margin: 10px 0;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
  }
`

const ResultNFTContainer = styled('div')`
  width: 400px;
  height: 400px;
  border: 1px #999999 solid;
  border-radius: 20px;
  padding: 10px;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .hint {
    color: #4fc89f;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    span{
      margin-bottom: 10px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

const Operation = styled('div')`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  .progress {
    width: 300px;
    margin-right: 10px;

    p {
      position: absolute;
      bottom: -5px;
      right: 50%;
    }
  }`

const Example: React.FC = () =>{
  return (
    <ExampleContainer>
      <SampleImage>
        <img className="sample" src={StyleEx} />
      </SampleImage>

      <div className="plus-icon" />
      <SampleImage>
        <img className="sample" src={ContentEx} />
      </SampleImage>
      <div className="equal-icon" />
      <SampleImage>
        <img className="sample" src={ResultEx} />
      </SampleImage>

    </ExampleContainer>
  )
}

const SelectedNFT: React.FC< {content: string} >= ({ content }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1100px)' })

  return (
    <SelectedNftContainer >
      {
        content &&  (

          <img src={content}  />

        )
      }
    </SelectedNftContainer >
  )
}

const NewNFTContainer:React.FC<{ aiNftUri: string, generating: boolean }> = ({ aiNftUri,generating }) =>{

  const navigate = useNavigate()

  // const toCreateNFT = useCallback(async () => {
  //   history.push(`/NFTCreate?img=${aiNftUri}`)
  // },[aiNftUri])

  return (
    <ResultNFTContainer >

      {
        generating && (
          <div className="hint">
            <span >This will take about 10~13sec...</span>
            <SyncLoader size={12} margin={2} color={'#4fc89f'} />
          </div>

        )
      }

      {
        aiNftUri &&  <img src={aiNftUri}  />
      }

    </ResultNFTContainer>
  )
}

const AiArt:React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { account } = useSolanaWeb3()

  const { data: coNftList } = useMintResultQuery({ wallet: account?.toBase58(), nft:'' } )
  const { data: ownedNftList, isLoading } = useOwnedNFTsQuery()
  const { data: styleContent } = useStyledNFTsQuery()
  const [aiNft, setAiNft] = useState<string>('')

  const coNftContent = useMemo(() => {
    return  coNftList?.map( (item:MintedNFTItem) => ({
      image: item.previewUrl
    }
    ))
  },[coNftList])

  const [style, setStyle] = useState('')
  const [content, setContent] = useState<string>('')
  const [contentType, setContentType] = useState('co-nft')
  const [list, setList] = useState<string[] | undefined>( undefined)
  const [threshold, setThreshold] = useState<number>(50)

  const userNftContent = useMemo(() => {
    return  ownedNftList?.map( (item:MetadataResult) => ({
      image: item.data?.image
    }
    ))
  },[coNftList])

  useEffect(() => {
    if (contentType === 'co-nft'){
      setList( coNftContent?.map((item: { image: any}) => item?.image))
    }
    else if (contentType === 'user-nft') {
      setList(userNftContent?.map((item: { image: any}) => item?.image))
    }
  },[contentType,account, coNftContent,userNftContent])

  const generate = useCallback(async () => {
    setAiNft('')
    setLoading(true)
    const result = await aiGeneratorStyle(style,content,threshold)
    const uri = await base64ToIPfsUri(result.data)
    setAiNft(uri)
    setLoading(false)
    return uri
  },[style, content, threshold])

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
            <span>Content</span>
            <SelectContentType value={contentType}
              onChange={ e => {
                setContentType(e.target.value)
                setList(undefined)
              }}
            />
          </SubTitle>

          <SelectableNFTList
            selectedValue={content}
            onSelect={v=> setContent(v)}
            list={list}
          />

        </Box>

        <Box sx={{ width: '100%', marginBottom: '50px' }}>
          <SubTitle>
            <div>Style Gene</div>
          </SubTitle>

          <SelectableNFTList
            selectedValue={style}
            onSelect={v=> setStyle(v)}
            list={ styleContent?.map((item: { image: any}) => item?.image)}
          />

        </Box>

        <Flex alignItems={'center'} justifyContent={'center'} >
          <Flex flexDirection={'column'}>
            <SelectedNFT content={content} />
            <SelectedNFT content={style} />
          </Flex>
          <img   src={GenerateBackground} />
          <NewNFTContainer aiNftUri={aiNft} generating={loading} />
        </Flex>

        <Operation>
          <div className={'progress'}>
            <CustomizedSlider
              onChange={(e, newValue) => setThreshold(newValue as number)}
            />

          </div>
          <CustomizeButton sx={{ width:'200px' }} onClick={generate} variant={'contained'}>Generate Now</CustomizeButton>

        </Operation>

      </PageWrapper>

    </Wrapper>
  )
}

export default AiArt

