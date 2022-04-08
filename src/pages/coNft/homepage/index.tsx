import React, { useMemo } from 'react'
// @ts-ignore
import styled from 'styled-components'
import { CoNFTData, PoolsListData } from '../../../types/coNFT'
import { useCoNFTDataQuery } from '../../../hooks/queries/useCoNftDataQuery'
import { EXTERNAL_LINKS } from '../../../layout/AppSideBar'
import CountUp from 'react-countup'
import PoolsListItem from './pools/PoolsListItem'
import { usePoolsQuery } from '../../../hooks/queries/usePoolsQuery'
import { CaretRightOutlined } from '@ant-design/icons'
import Banner1 from '../../../assets/images/coPools/banner.png'
import { useGetOverview } from '../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { DescriptionText, HeaderContainer, LeftArea, LeftBottom, MainTitle, RainbowButton, StyledCountUp } from './index.styles'
import { Box, Button, ThemeProvider } from '@mui/material'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import PoolList from './pools/PoolList'

const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    height: fit-content;
  }
`

const RightArea = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 50%;
  //background-image: radial-gradient(circle, #E42575, #680ba1, #120C18, #120C18);
  

  @media screen and (max-width: 1080px) {
    width: 100%;
    margin-top: 20px;
  }
`

const Banner = styled.div`
  width: 100%;
  
  img {
    width: 100%;
    object-fit: contain;
    border-radius: 10px;

  }
  
`

const ButtonArea = styled.div`
  margin: 40px 0;
  width: 400px;
  display: flex;
  justify-content: space-between;
  
  a{
    color: #ffffff
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`

const Header: React.FC<{ coNftData?: CoNFTData }> = ({ coNftData }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const { data: overviewData } = useGetOverview()

  const toArtistDetailUrl = '/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  return (
    <HeaderContainer>
      <LeftArea>
        <LeftTop>
          <MainTitle>
            <div className="title1"> HypeTeen </div>
            The First CO-NFT
            <div className={'title2'}><span>On</span> Forart Created</div>
          </MainTitle>

          <DescriptionText>
            Forart.ai provides the First AI-powered NFT SaaS for Social, which integrates NFT content creation and social attributes to provide
            a one-click experience for NFT creation, publishing and sharing. Forart.ai provides a direct co-creation space for NFT artists and enthusiasts,
            so that artistic inspiration and market demand can be reached in the Forart space.
          </DescriptionText>

          <ButtonArea>
            <Link to={toArtistDetailUrl}>
              <Button sx={{ padding: '15px 25px' }} variant={'contained'} color={'secondary'} >Create Hypeteen</Button>
            </Link>

            <RainbowButton>
              <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >
                Instruction
              </a>
            </RainbowButton>
          </ButtonArea>

        </LeftTop>

        <LeftBottom>
          <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center', marginRight: '40px' }}>
            {
              coNftData ? (
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <StyledCountUp
                    end={overviewData?.minted ? overviewData?.minted : '---'}
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

          <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'center' }}>
            {
              coNftData ? (
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <StyledCountUp
                    end={overviewData?.mintedWallet ? overviewData?.mintedWallet : '---'}
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
      {
        !isMobile && (
          <RightArea>
            <Banner>
              <img src={Banner1} />
            </Banner>
          </RightArea>
        )
      }

    </HeaderContainer>
  )
}

const CoNftPage: React.FC = () => {

  const { data: coNftData } = useCoNFTDataQuery()

  const { data: poolsList } = usePoolsQuery({
    size: 20,
    current: 1
  })

  return (
    <DefaultPageWrapper>
      <Header coNftData={coNftData} />
      <PoolList poolsList={poolsList?.records} />
    </DefaultPageWrapper>
  )

}
export default CoNftPage
