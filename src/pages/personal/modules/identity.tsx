import React, { useEffect, useMemo } from 'react'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import { Box, styled } from '@mui/material'
import Avatar from '../../../assets/images/artistDetail/hyteen.jpg'
import CustomizedAccordions from '../../../contexts/theme/components/Accordition'
import IdentityPrice from '../components/identity-price'
import IdentityGrade from '../components/identity-grade'
import { useOwnedNFTsQuery } from '../../../hooks/queries/useOwnedNFTsQuery'
import { PublicKey } from '@solana/web3.js'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import Text from '../../../contexts/theme/components/Text/Text'
import { MetadataResult } from '../../../utils/metaplex/metadata'
import { AttributesItem, AttributesItemForWalletNft, AttributesListItem } from '../../../components/attributes-item'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'
import ReactECharts from 'echarts-for-react'
import { EChartsOption } from 'echarts'
import { SyncLoader } from 'react-spinners'

const Wrapper = styled('div')`
  width: 100%; 
  height: auto;
  
`

const RainbowText = styled('div')`
  text-align: left;
  span {
    font-size: 40px;
    background-image: -webkit-linear-gradient( right, ${({ theme }) => theme.palette.secondary.light}, ${({ theme }) => theme.palette.secondary.main}, ${({ theme }) => theme.palette.primary.light});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: KronaOne-Regular;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    span {
      font-size: 36px;
    }
  }
`

const LeftContainer = styled('div')`
  width: 40%;
  margin: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`

const TopTitle = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

const PriceAccordion = styled('div')`
  grid-area: 3 / 6 / 4 / 12;
 
`

const GradeAccordion = styled('div')`
  grid-area:  4 / 6 / 5 / 12;
`

const ImageContainer = styled('div')`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: contain;
  }
  .info {
    padding: 5px 10px;
    color: #ffffff;
  }
`

const IdentityContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 20px;
  margin-top: 30px;

  ${({ theme }) => theme.breakpoints.down('md')} {

    flex-direction: column;
  }
  
`

const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 50%;

  ${({ theme }) => theme.breakpoints.down('md')} {

    width: 100%;
  }
`

const NFTItem:React.FC<{item?: MetadataResult }> = ({ item }) => {

  const option: EChartsOption = useMemo(() => {
    return ({
      xAxis: {
        type: 'category',
        data: [],
      },
      yAxis: {
        type: 'value',

      },

    })
  }, [])

  return (
    <IdentityContainer>
      <LeftContainer>
        <ImageContainer >
          <img src={item?.data?.image} />
        </ImageContainer>
        <ReactECharts option={option} />
      </LeftContainer>

      <InfoContainer>
        <TopTitle>
          <Text  fontFamily={'KronaOne-Regular'} fontSize={'20px'} color={'white'}>{item?.data?.name}</Text>
          <RainbowText > <span>{item?.data?.collection.name}</span> </RainbowText>
        </TopTitle>

        <Box sx={{ margin: '10px 0',  }}>
          <CustomizedAccordions  expanded={true} title={'Price'}>
            <IdentityPrice />
          </CustomizedAccordions>
        </Box>

        <Box sx={{ margin: '10px 0' }}>
          <CustomizedAccordions expanded={true} title={'Grade'}>
            <IdentityGrade attr={item?.data?.attributes} />
          </CustomizedAccordions>
        </Box>

        <Box sx={{ margin: '10px 0' }}>
          <CustomizedAccordions expanded={true} title={'Attributes'}>
            <AttributesItemForWalletNft item={item?.data?.attributes } />
          </CustomizedAccordions>
        </Box>

      </InfoContainer>

    </IdentityContainer>

  )
}

const Identity:React.FC = () => {

  const holds = useOwnedNFTsQuery(new PublicKey('7Gdgp25ghYQyNf6m5nVaxQbCMf2igDVHGStEz7B7vXUM'))
  const { data, isLoading } = holds

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <Wrapper >
      <Swiper navigation={true} modules={[Navigation]}>

        {
          isLoading ?
            (<Box sx={{ marginTop:'30px' }}><SyncLoader size={16} color={'white'} /></Box>)
            :
            (
              <>
                {
                  data?.map((nft: any, index: number) => (
                    <SwiperSlide  key={index} >
                      <NFTItem item={nft} />
                    </SwiperSlide>
                  ))
                }
              </>
            )
        }

      </Swiper>

    </Wrapper>
  )
}

export default Identity
