import React, { useEffect, useMemo, useState } from 'react'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import { Box, styled } from '@mui/material'
import Avatar from '../../../assets/images/artistDetail/hyteen.jpg'
import CustomizedAccordions from '../../../contexts/theme/components/Accordition'
import IdentityPrice from '../components/identity-price'
import IdentityGrade from '../components/identity-grade'
import { useOwnedNFTsQuery } from '../../../hooks/queries/account/useOwnedNFTsQuery'
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
import Flex from '../../../contexts/theme/components/Box/Flex'
import CustomizeButton from '../../../contexts/theme/components/Button'
import { Lock } from '@mui/icons-material'
import useBindDePainter from '../../../hooks/account/bindDepainter'
import { useUserBoundedDepainter } from '../../../hooks/queries/account/useUserBoundedDepainter'
import { useRefreshController } from '../../../contexts/refresh-controller'

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
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  
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

const ImageContainer = styled('div')`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  max-width: 560px;
  max-width: 560px;

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
  justify-content: space-around;
  align-items: flex-start;
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 10px;
  margin-top: 30px;
  max-width: 1220px;



  ${({ theme }) => theme.breakpoints.down('md')} {

    flex-direction: column;
  }
  
`

const InfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 52%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
  }
`

const Ribbon = styled('div')`
  position: absolute;
  top: 30px;
  display: flex;
  justify-content: center;
  height: 100%;
  width:  100%;
  max-width: 1220px;
  overflow: hidden;
  
  .ribbon {
    right: -64px;
    position: absolute;
    top: 32px;
    height: 60px;
    width: 250px;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.palette.primary.main};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: KronaOne-Regular;
    font-size: 24px;
    color: rgb(40,0,90);
    font-weight: bold;
  }
`

const NFTItem:React.FC<{item?: MetadataResult }> = ({ item }) => {

  const [bind, setBind] = useState<boolean>(false)
  const { forceRefresh } = useRefreshController()

  const { bindDePainter, loading } = useBindDePainter()

  const { data: userBoundDePainter } = useUserBoundedDepainter()

  useEffect(() => {
    if (!item || !userBoundDePainter) return
    if ( item.mint.toBase58() === userBoundDePainter.mintKey) {
      setBind(true)
    }
    if ( item.mint.toBase58() !== userBoundDePainter.mintKey) {
      setBind(false)
    }
  }, [userBoundDePainter, forceRefresh])

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

    <>
      <IdentityContainer>
        {
          bind &&
            <Ribbon >
              <div className={'ribbon'} >Bounded</div>
            </Ribbon>

        }

        <LeftContainer>
          <ImageContainer >
            <img src={item?.data?.image} />
          </ImageContainer>

          {
            bind ? (
              <CustomizeButton
                startIcon={<Lock />}
                color={'primary'}
                variant={'contained'}
                disabled
              >
                Already bound
              </CustomizeButton>
            ): (
              <CustomizeButton
                startIcon={<Lock />}
                color={'secondary'}
                variant={'contained'}
                onClick={() => bindDePainter(item?.mint.toBase58())}
                disabled={loading}
              >
                Bind DePainter {loading && <SyncLoader size={6} color={'#ffffff'} />}
              </CustomizeButton>
            )
          }
          {/*<ReactECharts option={option} />*/}
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
    </>

  )
}

const Identity:React.FC = () => {

  const holds = useOwnedNFTsQuery(new PublicKey('7Gdgp25ghYQyNf6m5nVaxQbCMf2igDVHGStEz7B7vXUM'))
  const { data, isLoading } = holds

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
                      <Flex width={'100%'} justifyContent={'center'} >
                        <NFTItem item={nft} />
                      </Flex>
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
