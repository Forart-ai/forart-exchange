import React, { useEffect, useMemo } from 'react'
// @ts-ignore
import styled from 'styled-components'
import { CoNFTData, PoolsListData } from '../../types/coNFT'
import { useCoNFTDataQuery } from '../../hooks/queries/useCoNftDataQuery'
import { EXTERNAL_LINKS } from '../../layout/AppSideBar'
import CountUp from 'react-countup'
import PoolsListItem from '../../components/PoolsListItem'
import { usePoolsQuery } from '../../hooks/queries/usePoolsQuery'
import { CaretRightOutlined } from '@ant-design/icons'
import Banner1 from '../../assets/images/coPools/banner.png'
import { useGetOverview } from '../../hooks/queries/useGetOverview'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import ForartTheme from '../../contexts/theme/config/dark'
// @ts-ignore

import YouTube from '@u-wave/react-youtube'
import useConnectedWallet from '../../hooks/useGetCurrentWallet'
import { Button, ThemeProvider } from '@mui/material'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useDonation } from '../../hooks/programs/useDonation'
import CONFT_API from '../../apis/co-nft'

const Wrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  height: 100%;
  margin: auto;
  padding-bottom: 50px;
  overflow: scroll;

  
`

const CoNftPageContainer = styled.div`
  max-width: 90%;
  height: fit-content;
  width: calc(100% - 80px);
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    width: calc(100% - 10px);
  }
`

const HeaderContainer = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  display: flex;
  padding: 40px 0;
  overflow: auto;
  

  @media screen and (max-width: 1080px) {
    flex-direction: column;
    padding: 10px 0;
    height: fit-content;
  }
`

const LeftArea = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    width: 100%;
    padding: 0;
  }
  
`
const LeftTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 1080px) {
    height: fit-content;
  }
`
const LeftBottom = styled.div`
  margin-top: 20px;
  width: 100%;
  min-width: 40%;
  padding: 1px;
  border-radius: 10px;
  background: linear-gradient(to bottom, #E42575, #4A0E6F) border-box;

  .row {
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 0 10px;
  }

  .data-container {
    background: linear-gradient(0deg, rgba(14, 22, 39, .9), rgba(2, 8, 16, 0.9)) border-box;
    border-radius: 10px;
    padding: 10px ;
    height: 100%;
    display: flex;

    .label {
      font-size: 1em;
      color: #fff;
      margin-right: 10px;
    }
  }
  
  @media screen and (max-width: 1080px) {
    .row {
      justify-content: center;
      flex-direction: column;
    }
    .data-container {
      justify-content: space-between;
      padding: 5px;
    }
  }
`

const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 60%;
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

const MainInfo = styled.div`
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  .title {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 900;
    font-family: 'inter-extraBold';
    //background: linear-gradient(90deg ,#12dbe4, #02fbab);
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
  }

  .description {
    font-size: 1.3em;
    color: #A197AA;
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }

`

const LinkContainer = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
`

const SCExternalLink = styled.a`
  margin-right: 15px;
  background-color: rgb(42,38,48);
  padding: 8px;
  border-radius: 6px;
  
  :hover {
    opacity: .8;
  }

  .link-name {
    margin-left: 20px;
    z-index: 1;
  }

  img {
    width: 25px;
  }
`

const ButtonArea = styled.div`
  margin-top: 20px;
  width: 350px;
  display: flex;
  justify-content: space-between;
  
  a{
    color: #ffffff
  }

  @media screen and (max-width: 1080px) {
    width: 100%;
  }
`

const PoolsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  //background: radial-gradient(62% 35px at center top, #1C1C1D 77%, #2A2E35 77.5%);
  color: #fc6ea3;

  .title {
    font-size: 2.8em;
    display: flex;
    align-items: center;
  }

`

const PoolListContainer = styled.div`
  width: 100%;
  //display: flex;
  //flex-wrap: wrap;
  //justify-content: space-between;
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;

  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(1, auto);
  }

`

const StyledCountUp = styled(CountUp)`
  //background: linear-gradient(90deg ,#12dbe4, #02fbab);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  color: #FF468B;
  font-size: 2.8em;
`

const Header: React.FC<{ coNftData?: CoNFTData }> = ({ coNftData }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const INFO_DETAILS = {
    title: 'CO-NFT',
    describe: 'Forart.ai provides the First AI-powered NFT SaaS for Social, which integrates NFT content creation and social attributes to provide' +
      ' a one-click experience for NFT creation, publishing and sharing. Forart.ai provides a direct co-creation space for NFT artists and enthusiasts,' +
      ' so that artistic inspiration and market demand can be reached in the Forart space.'
  }

  const { data: overviewData } = useGetOverview()

  const toArtistDetailUrl = '/artistDetail?' + new URLSearchParams({
    artistId: '3312'
  }).toString()

  return (
    <HeaderContainer>
      <LeftArea>
        <LeftTop>
          <MainInfo>
            <div className="title">{INFO_DETAILS.title}</div>
            {
              isMobile && (
                <RightArea>
                  <Banner>
                    <img src={Banner1} />
                  </Banner>
                </RightArea>
              )
            }
            <div className="description">{INFO_DETAILS.describe}</div>
          </MainInfo>

          <LeftBottom>
            <div className="data-container">
              <div className="row">
                <div className="label">TOTAL CREATE</div>
                {
                  coNftData ? (
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <StyledCountUp
                        end={overviewData?.minted ? overviewData?.minted : '---'}
                        duration={2}
                        separator=","
                        style={{ fontSize: '1.2em' }}
                      />
                      <div style={{ color: '#FF468B', fontSize: '1em' }}> /2000</div>
                    </div>
                  ) :
                    <StyledCountUp end={0} />
                }
              </div>

              <div className="row">
                <div className="label">CREATORS</div>
                {
                  coNftData ? (

                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <StyledCountUp
                        end={overviewData?.mintedWallet ? overviewData?.mintedWallet : '---'}
                        duration={2}
                        separator=","
                        style={{ fontSize: '1.2em' }}
                      />
                      <div style={{ color: '#FF468B', fontSize: '1em' }} />
                    </div>
                  ) :
                    <StyledCountUp end={0} />
                }
              </div>

            </div>
          </LeftBottom>

          <ButtonArea>
            <Link to={toArtistDetailUrl}>
              <Button  size={isMobile ? 'small' : 'medium'} variant={'contained'}  color={'primary'}>Create Hypeteen</Button>
            </Link>
            <Button size={isMobile ? 'small' : 'medium'} variant={'contained'}  color={'secondary'}>
              <a href="https://youtu.be/GrknLnLrwjU" target="_blank" rel="noopener noreferrer" >
                Instruction
              </a>
            </Button>
          </ButtonArea>

          <LinkContainer>
            {
              EXTERNAL_LINKS.map(({ icon, link }) => (
                <SCExternalLink key={link} href={link} target="_blank" rel="noreferrer">
                  <img src={icon} alt={link} />
                </SCExternalLink>
              ))
            }
          </LinkContainer>
        </LeftTop>

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

const PoolsList: React.FC<{ poolsList?: Array<PoolsListData> }> = ({ poolsList }) => {

  const { data: overviewData } = useGetOverview()

  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' })

  const req = {
    'image': 'https://forart.mypinata.cloud/ipfs/QmSFo7w1m87FnSbcgWAsydWzsjKiExZCrt7ynxMJLQP2d4',
    'name': 'HypeTeen',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': overviewData?.minted,
    'minters': overviewData?.mintedWallet,
    'status': 'closing',
    'artistId': '3312'
  }

  useMemo(() => {
    if (isMobile) {
      req.describe =  req.describe.substr(0,70) + '...'
    }
    else return
  },[req])

  return (
    <PoolsContainer>
      <div className="title">
        <div>Live Pools</div>
        <CaretRightOutlined style={{ fontSize: '0.6em', marginLeft: '15px' }} />
      </div>
      <PoolListContainer>
        <PoolsListItem
          data={req}
          status={req.status}
        />
        {
          poolsList?.map((pool: PoolsListData, index: number) => (
            <PoolsListItem
              data={pool}
              key={index}
              status={pool.status}
            />
          ))
        }

      </PoolListContainer>

    </PoolsContainer>
  )

}

const CoNftPage: React.FC = () => {

  const { account } = useSolanaWeb3()

  const { data: coNftData } = useCoNFTDataQuery()

  const { data: poolsList } = usePoolsQuery({
    size: 20,
    current: 1
  })

  const { userDonated } = useDonation()

  useEffect(() => {
    if (account && userDonated.data) {
      CONFT_API.core.user.userSeriesVote(3312, account.toBase58(), ( userDonated.data).toNumber() )
    }
  },[account, userDonated])

  return (
    <Wrapper>
      <CoNftPageContainer>
        <Header coNftData={coNftData} />
        <PoolsList poolsList={poolsList?.records} />
      </CoNftPageContainer>
    </Wrapper>
  )

}
export default CoNftPage
