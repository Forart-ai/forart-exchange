import React from 'react'
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
// @ts-ignore

import YouTube from '@u-wave/react-youtube'

const Wrapper = styled.div`
  max-width: 100vw;
  width: 100%;
  height: 100vh;
  margin: auto;
  padding-bottom: 50px;
  overflow: scroll;
`

const CoNftPageContainer = styled.div`
  max-width: 1400px;
  width: calc(100% - 80px);
  margin-left: auto;
  margin-right: auto;

`

const HeaderContainer = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  border-radius: 15px;
  display: flex;
  padding: 50px 0;
`

const LeftTop = styled.div`
  width: 100%;
  height: 40%;

`

const VideoArea = styled.div`
  width: 98%;
  height: 60%;
`

const LeftBottom = styled.div`
  height: 35%;
  width: 100%;
  min-width: 40%;
  padding: 1px;
  border-radius: 10px;
  background: linear-gradient(to bottom, #FF468B, #12dbe4) border-box;

  .row {
    display: flex;
    align-items: center;

  }

  .data-container {
    background: linear-gradient(0deg, rgba(14, 22, 39, .9), rgba(2, 8, 16, 0.9)) border-box;
    border-radius: 10px;
    padding: 30px 30px 18px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .label {
      font-size: 1.3em;
      color: #fff;
      border-right: 1px #fc6ea3 solid;
      padding: 2px 25px;
      margin-right: 12px;
    }
  }
`

const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 60%;
  background-image: radial-gradient(circle, #c330c9, #701473, rgb(17, 17, 17), rgb(17, 17, 17));

  img {
    width: 100%;
    object-fit: contain;
  }
`

const MainInfo = styled.div`
  color: #fff;

  .title {
    font-size: 2.8em;
    text-transform: uppercase;
    //background: linear-gradient(90deg ,#12dbe4, #02fbab);
    //-webkit-background-clip: text;
    //-webkit-text-fill-color: transparent;
  }

  .description {
    font-size: 1.3em;
  }

`

const LinkContainer = styled.div`
  margin-top: 5%;
  display: flex;
  width: fit-content;

`

const SCExternalLink = styled.a`
  margin-right: 15px;

  .link-name {
    margin-left: 20px;
    z-index: 1;
  }

  img {
    width: 30px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;

`

const StyledCountUp = styled(CountUp)`
  //background: linear-gradient(90deg ,#12dbe4, #02fbab);
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
  color: #FF468B;
  font-size: 2.8em;
`

const Header: React.FC<{ coNftData?: CoNFTData }> = ({ coNftData }) => {

  const INFO_DETAILS = {
    title: 'CO-NFT',
    describe: 'Forart.ai provides the First AI-powered NFT SaaS for Social, which integrates NFT content creation and social attributes to provide' +
      ' a one-click experience for NFT creation, publishing and sharing. Forart.ai provides a direct co-creation space for NFT artists and enthusiasts,' +
      ' so that artistic inspiration and market demand can be reached in the Forart space.'
  }

  const { data: overviewData } = useGetOverview()

  return (
    <HeaderContainer>
      <div style={{ display: 'flex', flexDirection: 'column', width: '65%' }}>
        <LeftTop>
          <MainInfo>
            <div className="title">{INFO_DETAILS.title}</div>
            <div className="description">{INFO_DETAILS.describe}</div>
          </MainInfo>

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

        <VideoArea>

          <YouTube
            video="GVAfF0TM-NM"
            autoplay
            height={'100%'}
            width={'100%'}
            suggestedQuality={'default'}
            showRelatedVideos= {false}
          />
        </VideoArea>

        {/*<LeftBottom>*/}
        {/*  <div className="data-container">*/}
        {/*    <div className="row">*/}
        {/*      <div className="label">TOTAL VALUE</div>*/}
        {/*      {*/}
        {/*        coNftData ? (*/}
        {/*          <div style={{ display: 'flex', alignItems: 'baseline' }}>*/}
        {/*            <StyledCountUp*/}
        {/*              end={overviewData?.minted ? overviewData?.minted : '---'}*/}
        {/*              duration={2}*/}
        {/*              separator=","*/}
        {/*            />*/}
        {/*            <div style={{ color: '#FF468B', fontSize: '1.6em' }}>SOL</div>*/}
        {/*          </div>*/}
        {/*        ) :*/}
        {/*          <StyledCountUp end={0} />*/}
        {/*      }*/}
        {/*    </div>*/}

        {/*    <div className="row">*/}
        {/*      <div className="label">MINTERS</div>*/}
        {/*      {*/}
        {/*        coNftData ? (*/}

        {/*          <div style={{ display: 'flex', alignItems: 'baseline' }}>*/}
        {/*            <StyledCountUp*/}
        {/*              end={overviewData?.mintedWallet ? overviewData?.mintedWallet : '---'}*/}
        {/*              duration={2}*/}
        {/*              separator=","*/}
        {/*            />*/}
        {/*            <div style={{ color: '#FF468B', fontSize: '1.6em' }} />*/}
        {/*          </div>*/}
        {/*        ) :*/}
        {/*          <StyledCountUp end={0} />*/}
        {/*      }*/}
        {/*    </div>*/}

        {/*  </div>*/}
        {/*</LeftBottom>*/}
      </div>
      <RightArea>
        <img src={Banner1} />
      </RightArea>
    </HeaderContainer>
  )
}

const PoolsList: React.FC<{ poolsList?: Array<PoolsListData> }> = ({ poolsList }) => {

  const { data: overviewData } = useGetOverview()

  const req = {
    'image': 'https://forart.mypinata.cloud/ipfs/QmSFo7w1m87FnSbcgWAsydWzsjKiExZCrt7ynxMJLQP2d4',
    'name': 'HypeTeen',
    'describe': 'HypeTeen is the first CO-NFT on Forart created by well-known NFT designer Monica. Hypeteen is a good-looking and interesting teen.',
    'nfts': overviewData?.minted,
    'minters': overviewData?.mintedWallet,
    'status': 'closing',
    'artistId': '3312'
  }

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

  const { data: coNftData } = useCoNFTDataQuery()

  const { data: poolsList } = usePoolsQuery({
    size: 20,
    current: 1
  })

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
