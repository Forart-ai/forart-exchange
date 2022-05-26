import React, { useMemo } from 'react'
import styled from 'styled-components'
import { usePoolsQuery } from '../../../hooks/queries/usePoolsQuery'
import { useGetOverview } from '../../../hooks/queries/useGetOverview'
import { Link } from 'react-router-dom'
import ComingSoonBackground from '../../../assets/images/home/coming-soon.png'

import {
  DescriptionText,
  HeaderContainer,
  LeftArea,
  LeftBottom,
  MainTitle,
  RainbowButton,
  StyledCountUp,
  RightArea,
  Wrapper,
  Background
} from './index.styles'
import { Box, Button } from '@mui/material'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import PoolList from './pools/PoolList'
import HomepageBanner from '../../../assets/images/coPools/homepage-banner.webp'
import PainterBanner from '../../../assets/images/home/painter-banner.webp'

import {  Swiper , SwiperSlide } from 'swiper/react'
import  { Pagination, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import CustomizeButton from '../../../contexts/theme/components/Button'
import Text from '../../../contexts/theme/components/Text/Text'
import { PoolsListData } from '../../../types/coNFT'
import AppFooter from '../../../layout/AppFooter'

export const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
 
  
`

export const Banner = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 90%;
    object-fit: contain;
    border-radius: 10px;
  } 
  
`

export const ButtonArea = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: flex-start;
  
  a{
    color: #ffffff
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`

const Header: React.FC = () => {

  const { data: painterData } = useGetOverview(1024)

  const { data: hypeteenData } = useGetOverview(3312)

  const toArtistDetailUrl = '/co-nft/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  const toPainterDetailUrl = '/co-nft/artistDetail?' + new URLSearchParams({
    artistId: '1024'
  }).toString()

  // const token = useLocalStorage('TOKEN')

  return (
    <HeaderContainer>

      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        draggable={true}
        loop={true}
      >

        <SwiperSlide >
          <Wrapper>

            <RightArea>
              <Banner>
                <img src={PainterBanner}  />
              </Banner>
            </RightArea>

            <LeftArea>
              <LeftTop>
                <MainTitle>
                  <div className="title1"> DePainter  </div>

                  <div className={'title2'}> <span> The Unique Admin Ticket</span> To  Forart.ai</div>
                </MainTitle>

                <DescriptionText>
                  Forart.ai is an AI-Powered C2E platform with Social-Fi and Game-Fi elements.
                  We&apos;re searching for 10000 innovative and creative painters to jointly explore the adventure trip.
                </DescriptionText>

                <ButtonArea>
                  <Link to={toPainterDetailUrl}>
                    <CustomizeButton sx={{ padding: '15px 25px', borderRadius:'10px', marginRight:'30px' }} variant={'contained'} color={'secondary'} >Create DePainter</CustomizeButton>
                  </Link>

                  {/*<RainbowButton>*/}
                  {/*  <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >*/}
                  {/*    Instruction*/}
                  {/*  </a>*/}
                  {/*</RainbowButton>*/}
                </ButtonArea>

              </LeftTop>

              <LeftBottom>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center',  }}>
                  {
                    painterData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent:'center' }}>
                        <StyledCountUp
                          end={painterData?.minted ? painterData?.minted : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> /10000</div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Total create</div>
                </Box>

                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  {
                    painterData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <StyledCountUp
                          end={painterData?.minter ? painterData?.minter : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> </div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Creators</div>
                </Box>
              </LeftBottom>

            </LeftArea>

          </Wrapper>
        </SwiperSlide>

        <SwiperSlide>
          <Wrapper>
            <LeftArea>
              <LeftTop>
                <MainTitle>
                  <div className="title1"> HypeTeen </div>
                  The First CO-NFT
                  <div className={'title2'}><span>On</span> Forart Created</div>
                </MainTitle>

                <DescriptionText>
                  Forart.ai is an AI-Powered “Create To Earn” Game & Social platform, which combines the attributes of GameFi and SocialFi, making NFT artists and enthusiasts realize NFT co-creation in the way of NFT DIY games.
                </DescriptionText>

                <ButtonArea>
                  <Link to={toArtistDetailUrl}>
                    <CustomizeButton sx={{ padding: '15px 25px', borderRadius:'10px', marginRight:'30px' }} variant={'contained'} color={'secondary'} >Mint Hypeteen</CustomizeButton>
                  </Link>

                  {/*<RainbowButton>*/}
                  {/*  <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >*/}
                  {/*    Instruction*/}
                  {/*  </a>*/}
                  {/*</RainbowButton>*/}
                </ButtonArea>

              </LeftTop>

              <LeftBottom>
                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', }}>
                  {
                    hypeteenData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline',  justifyContent:'center'  }}>
                        <StyledCountUp
                          end={hypeteenData?.created ? hypeteenData?.created : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> /2000</div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Total create</div>
                </Box>

                <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                  {
                    hypeteenData ? (
                      <div style={{ display: 'flex', alignItems: 'baseline' }}>
                        <StyledCountUp
                          end={hypeteenData?.creator ? hypeteenData?.creator : '---'}
                          duration={2}
                          separator=","

                        />
                        <div className={'total-data'}> </div>
                      </div>
                    ) :
                      <StyledCountUp end={0} />
                  }
                  <div className={'label'}>Creators</div>
                </Box>
              </LeftBottom>
            </LeftArea>

            <RightArea>
              <Banner>
                <img src={HomepageBanner} style={{ width: '80%' }} />
              </Banner>
            </RightArea>
          </Wrapper>

        </SwiperSlide>

      </Swiper>
    </HeaderContainer>

  )
}

const CoNftPage: React.FC = () => {

  const { data: poolsList } = usePoolsQuery({
    size: 20,
    current: 1
  })

  const mockComingSoon = [
    {
      'image': ComingSoonBackground,
      'name': 'Coming soon',
      'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
      'nfts': '0',
      'minters': '0',
      'status': 'Coming soon',
      'artistId': '0',
      artistName: '----'
    },
    {
      'image': ComingSoonBackground,
      'name': 'Coming soon',
      'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
      'nfts': '0',
      'minters': '0',
      'status': 'Coming soon',
      'artistId': '0',
      artistName: '----'
    }
  ]

  return (
    <>
      <Background>
        <Header  />
      </Background>
      <DefaultPageWrapper>
        <PoolList poolsList={mockComingSoon} />
      </DefaultPageWrapper>
      <AppFooter />

    </>
  )

}
export default CoNftPage
