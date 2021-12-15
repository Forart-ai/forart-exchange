import React from 'react'
// @ts-ignore
import styled from 'styled-components'
import { CoNFTData, PoolsListData } from '../../types/coNFT'
import { useCoNFTDataQuery } from '../../hooks/queries/useCoNftDataQuery'
import { EXTERNAL_LINKS } from '../../layout/AppSideBar'
import CountUp from 'react-countup'
import PoolsListItem from '../../components/PoolsListItem'
import { usePoolsQuery } from '../../hooks/queries/usePoolsQuery'

const Wrapper = styled.div`
  max-width: 1400px;
  height: 100%;
  margin: auto;
`

const CoNftPageContainer = styled.div`
  max-width: 1900px;
  width: calc(100% - 40px);
  margin-left: auto;
  margin-right: auto;

`

const HeaderContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 10px;
  //background: radial-gradient( 60% 40px at center bottom 0, #fff 75%, #2A2E35 80%);
  background: radial-gradient(62% 35px at center bottom, #1C1C1D 76%, #2A2E35 77.5%);

  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 60px;
`

const  LeftArea = styled.div`
  width: calc(60% - 5px);
  height: 100%;
`

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 42px;
  text-transform: uppercase;
  background: linear-gradient(180deg ,#12dbe4, #02fbab);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const  RightArea = styled.div`
  height: 100%;
  max-width: 500px;
  min-width: 40%;
  padding: 1px;
  border-radius: 10px;
  background: linear-gradient(45deg, #00EBA4, #02A6F5) border-box;
  
  .data-container {
    background: linear-gradient(0deg, rgba(14,22,39,.8),rgba(36,52,84,.8)) border-box;
    border-radius: 10px;
    padding: 30px 30px 18px;
    height: 100%;
    
    .label {
      font-size: 22px;
      color: #fff;
    }
  }
`

const MainInfo = styled.div`
  
  .title {
    font-size: 42px;
    text-transform: uppercase;
    background: linear-gradient(90deg ,#12dbe4, #02fbab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .description {
    font-size: 16px;
    color: #fff;
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
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`

const StyledCountUp = styled(CountUp)`
  background: linear-gradient(90deg ,#12dbe4, #02fbab);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 33px;
`

const Header: React.FC<{ coNftData?: CoNFTData }> = ({ coNftData }) => {

  const INFO_DETAILS = {
    title:'CO-NFT',
    describe:'A co-creation mechanism between NFT artists and enthusiasts can give full play to the artist’s creative talents and enthusiasts’ hobbies and suggestions, forming a collision of NFT artistic creations and producing unexpected results.'
  }


  return (
    <HeaderContainer>
      <LeftArea>
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
      </LeftArea>
      <RightArea>
        <div className="data-container">
          <div className="label">TOTAL VALUE</div>

          {
            coNftData ? (
              <StyledCountUp
                end={coNftData.totalValueStaked}
                duration={2}
                separator=","
                suffix= " FTA "
              />
            ) :
              <StyledCountUp />
          }

          <div className="label">AVERAGE APY</div>

          {
            coNftData ? (
              <StyledCountUp
                end={ (coNftData.averageAPY)*100 }
                duration={2}
                separator=","
                suffix= " % "
              />
            ) :
              <StyledCountUp />
          }

        </div>
      </RightArea>
    </HeaderContainer>
  )
}

const PoolsList: React.FC<{ poolsList?: Array<PoolsListData>}> = ({ poolsList }) => {

  return (
    <PoolsContainer>
      {
        poolsList?.map((pool: PoolsListData, index: number) => (
          <PoolsListItem
            data= {pool}
            key= {index}
          />
        ))
      }

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
