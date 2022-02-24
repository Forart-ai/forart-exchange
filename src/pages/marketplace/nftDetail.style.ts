// @ts-ignore
import styled from 'styled-components'
import { Button, Tabs } from 'antd'

const { TabPane } = Tabs

export const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 68px);
  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const NFTDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }

`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  position: relative;
  object-fit: cover;

  
  img {
    width: 100%;
    height: 80vh;
    object-fit: contain;
    border-radius:10px;
  }
  
  @media screen and (max-width: 1100px) {
    width: 100%;
    height: fit-content;
    border: 1px palegreen solid;
    
    img {
      height: 40vh;
    }

  }
  
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  overflow-y: scroll;
  
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`

export const TopBaseInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  
  .nft-name {
    font-size: 2.2em;
    font-weight: bolder;
    color: #F9F9F9;
    margin-bottom: 5px;
  }
  
  .nft-view {
    user-select: none;
    border: 2px #b2b2b2 solid;
    padding: 2px 6px;
    border-radius: 20px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 1.2em;
    color: #F9F9F9;
    width: 130px;
    
    img {
      width: 30px;
    }
    
    .like {
      cursor: pointer;
     img{
       width: 25px;
     }
    }
  }
  
  @media screen and (max-width: 1100px) {
    margin-top: 10px;
    .nft-name {
      font-size: 26px;
    }
  }

`

export const CenterInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .description {
    color: #F9F9F9;
    height: 10%;
    padding: 5px 10px;
    overflow-y: scroll;
    font-size: 1.3em;
    font-weight: normal;
    line-height: 20px;
    margin-top: 10px;
    background-color: #2A2E35;
    border-radius: 10px;
    
    //overflow: hidden;
    //text-overflow: ellipsis;
    //white-space: nowrap;
  }

  .text {
    color: #F9F9F9;
    font-size: 1.2em;
    display: flex;
    margin: 10px 0;
    align-items: center;

    .price {
      margin-left: 5px;
      font-size: 1.3em;
      color: #ff468b;
      font-weight: bold;
    }
  }

  .info-label {
    font-size: 1.2em;
    color: #cecaca;
  }

  .info-value {
    color: #F9F9F9;
    user-select: none;
    font-size: 1.3em;
    max-height: 100px;

  }

  .icon-copy {
    margin-left: 5px;
    color: #F9F9F9;
    cursor: pointer;
  }

`

export const BottomInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .tabs-container {
    

    .label {
      color: #B3B3B3;
      font-size: 1.3em;
      margin-bottom: 10px;
    }
    .value {
      color: #F9F9F9;
      font-size: 1.4em;
      margin-bottom: 30px;

      img {
        width: 40px;
        border-radius: 30px;
        background: #282c34;
        margin-right: 15px;
      }
    }
  }
`

export const NFTBaseInfoContainer = styled.div`
  max-width: 100vw;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  .top {
    height: fit-content;

  }
  
`

export const StyledTab  = styled(Tabs)`
  user-select: none;
  .ant-tabs-tab {
    font-size: 1.4em;
    color: #608599 !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #FF468B !important;

  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    line-height: 20px;
    background: linear-gradient(to right, #FF468B, #12dbe4) border-box;
    padding: 2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`

export const StyledTabPane  = styled(TabPane)`
  height: 220px;
  
`

export const StyledButton = styled(Button)`
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
`

export const CenterRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.div`
 font-size: 1.8em;
 font-weight: 550;
 color: #F9F9F9;
 margin-bottom: 20px;
`

export const PropertiesContainer = styled.div `
  position: relative;
 width: 375px;
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 height: 300px;
 


`

export const CodingFlag = styled.img`
  position: absolute;
  right: 0;
  top: 0;

  z-index: 55;
  height: 100px;
`

export const HistoryTradeTable = styled.div`
  width: 100%;
`

export const OtherArtworksArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 40px;

  @media screen and (max-width: 1000px) {
    width: 100vw;
  }

`

export const FootRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Operating = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;
  
`

export const TradingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .line {
    width: 100%;
    height: 2px;
    border-top: 1px #555151 solid;
    margin-bottom: 20px;
  }
  
  .operation {
     width: 100%;
  }


  .owner-operation {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

`
