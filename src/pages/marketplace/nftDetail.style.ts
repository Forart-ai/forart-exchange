// @ts-ignore
import styled from 'styled-components'
import { Button, Tabs } from 'antd'
import CodingFlagIcon from '../../assets/images/marketplace/coding-flag.png'
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
    border: 1px red solid;
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

export const ItemsContainer = styled.div`
 width: 100%;
 height: 100%;
 display: flex;
 justify-content: space-between;

 .border {
  width: 45%;
  height: 100%;
  background: #282c34;
  border-radius: 10px;


  .row {
   padding: 0 10px;
   height: 50%;
   display: flex;
   justify-content: space-between;
   align-items: center;

   .label {
    font-size: 14px;
    font-weight: 500;
    color: #B3B3B3;

   }

   .value {
    font-size: 14px;
    font-weight: 550;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   }
  }
}
`

export const TopBaseInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  
  .nft-name {
    font-size: 34px;
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
    font-size: 16px;
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
    font-size: 16px;
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
    font-size: 16px;
    display: flex;
    margin: 10px 0;
    align-items: center;

    .price {
      margin-left: 5px;
      font-size: 20px;
      color: #00EBA4;
    }
  }

  .info-label {
    font-size: 16px;
    color: #cecaca;
  }

  .info-value {
    color: #F9F9F9;
    user-select: none;
    font-size: 18px;
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
      font-size: 16px;
      margin-bottom: 10px;
    }
    .value {
      color: #F9F9F9;
      font-size: 18px;
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
  width: 100% ;
  height: 100%;
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
    font-size: 16px;
    color: #608599 !important;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #00EBA4 !important;

  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    line-height: 20px;
    background-image: linear-gradient(to right, #00EBA4, #02A6F5);
    padding: 2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`

export const StyledTabPane  = styled(TabPane)`
  height: 220px;
  
`

export const StyledButton = styled(Button)`
  background-image: linear-gradient(to right, #00EBA4, #02A6F5);
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
 font-size: 26px;
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

export const PropertiesItem = styled.div`
 width: 45%;
 height: 40%;
 display: flex;
 align-items: center;
 flex-direction: column;
 justify-content: center;
 background: #282c34;
 border-radius: 10px;

 color: white;
 
 .key {
  font-size: 18px;
  font-weight: 550;
 }
 .value ,.percent {
  font-size: 15px;
  font-weight: 500;
  color: #F9F9F9;
 }
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

export const OtherArtworksContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .artwork-group {
    height: 300px;
    width: 200px;
    background-color: #282c34;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .artwork-info {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;


      .artwork-img {
        height: 80%;
        width: 100%;
        object-fit: contain;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        
        img {
          height: 100%;
          width: 100%;
        }
      }
      
      

      .artwork-describe {
        padding: 0 15px;

        width: 100%;
        font-size: 14px;
        font-weight: 550;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        margin-bottom: 15px;
        -webkit-box-orient: vertical;
      }
    }

    .artwork-like {
      padding: 0 15px;

      display: flex;
      justify-content: space-between;
      width: 100%;
      

      .liked {
        display: flex;
        font-size: 14px;
        font-weight: 500;
        color: white;
      }
    }
  }
  
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
