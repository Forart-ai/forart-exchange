import React, { useMemo } from 'react'
import styled from 'styled-components'
import { CoNFTData } from '../../../types/coNFT'
import { useCoNFTDataQuery } from '../../../hooks/queries/useCoNftDataQuery'
import { usePoolsQuery } from '../../../hooks/queries/usePoolsQuery'
import { useGetOverview } from '../../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import {
  DescriptionText,
  HeaderContainer,
  LeftArea,
  LeftBottom,
  MainTitle,
  RainbowButton,
  StyledCountUp,
  RightArea,
} from './index.styles'
import { Box, Button } from '@mui/material'
import DefaultPageWrapper from '../../../components/default-page-wrapper'
import PoolList from './pools/PoolList'
import HomepageBanner from '../../../assets/images/coPools/homepage-banner.png'
import useLocalStorage from '../../../hooks/useLocalStorage'

const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  
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
  display: flex;
  justify-content: flex-start;
  
  a{
    color: #ffffff
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`

const Header: React.FC<{ coNftData?: CoNFTData }> = ({ coNftData }) => {

  const { data: overviewData } = useGetOverview()

  const toArtistDetailUrl = '/co-nft/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  // const token = useLocalStorage('TOKEN')

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
            a one-click experience for NFT creation, publishing and sharing.
          </DescriptionText>

          <ButtonArea>
            <Link to={toArtistDetailUrl}>
              <Button sx={{ padding: '15px 25px', borderRadius:'10px', marginRight:'30px' }} variant={'contained'} color={'secondary'} >Create Hypeteen</Button>
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
                <div style={{ display: 'flex', alignItems: 'baseline',  width:'200px' }}>
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

      <RightArea>
        <Banner>
          <img src={HomepageBanner} />
        </Banner>
      </RightArea>

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
