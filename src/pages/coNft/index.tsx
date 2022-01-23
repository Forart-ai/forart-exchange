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

const Wrapper = styled.div`
  max-width: 1400px;
  height: fit-content;
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
  height: 600px;
  position: relative;
  border-radius: 15px;
  display: flex;
  padding: 50px 0;
`

const  LeftTop = styled.div`
  width: 100%;
  margin-bottom: 20px;
  height: 60%;

`

const  LeftBottom = styled.div`
  height: 35%;
  width: 100%;
  min-width: 40%;
  padding: 1px;
  border-radius: 10px;
  background: linear-gradient(45deg, #12dbe4, #FF468B) border-box;

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
  border: 1px red solid;
  width: 65%;
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

const CurveTop = styled.div`
  width: 100%;
  position: relative;
  height: 180px;
  background: #2A2E35;
  //background: radial-gradient(62% 35px at center top, #1C1C1D 77%, #2A2E35 77.5%);
  border-radius: 50% 50% 0 0;
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
    title:'CO-NFT',
    describe:'A co-creation mechanism between NFT artists and enthusiasts can give full play to the artist’s creative talents and enthusiasts’ hobbies and suggestions, forming a collision of NFT artistic creations and producing unexpected results.'
  }


  return (
    <HeaderContainer>
      <div style={{ display:'flex', flexDirection:'column',  width: '65%' }}>
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
        <LeftBottom>
          <div className="data-container">
            <div className= "row">
              <div className="label">TOTAL VALUE</div>
              {
                coNftData ? (
                  <div style={{ display:'flex', alignItems:'baseline' }} >
                    <StyledCountUp
                      end={coNftData.totalValueStaked}
                      duration={2}
                      separator=","
                    />
                    <div style={{ color:'#FF468B', fontSize:'1.6em' }}>FTA</div>
                  </div>
                ) :
                  <StyledCountUp end={0} />
              }
            </div>

            <div className= "row" >
              <div className="label">AVERAGE APY</div>
              {
                coNftData ? (

                  <div style={{ display:'flex', alignItems:'baseline' }} >
                    <StyledCountUp
                      end={ (coNftData.averageAPY)*100 }
                      duration={2}
                      separator=","
                    />
                    <div style={{ color:'#FF468B', fontSize:'1.6em' }}>%</div>
                  </div>
                ) :
                  <StyledCountUp  end={0} />
              }
            </div>

          </div>
        </LeftBottom>
      </div>
      <RightArea />
    </HeaderContainer>
  )
}

const PoolsList: React.FC<{ poolsList?: Array<PoolsListData>}> = ({ poolsList }) => {

  return (
    <PoolsContainer>
      <div className="title">
        <div>Live Pools</div>
        <CaretRightOutlined style={{ fontSize:'0.6em', marginLeft: '15px' }} />
      </div>
      <PoolListContainer>
        {
          poolsList?.map((pool: PoolsListData, index: number) => (
            <PoolsListItem
              data= {pool}
              key= {index}
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

  const { data: poolsList }= usePoolsQuery({
    size: 20,
    current: 1
  })



  return (
    <Wrapper>
      <CoNftPageContainer>
        <Header coNftData={ coNftData } />
        <PoolsList poolsList={ poolsList?.records } />
      </CoNftPageContainer>
    </Wrapper>
  )

}
export default CoNftPage
