// @ts-ignore
import styled from 'styled-components'
import { Button, Tabs } from 'antd'
import CodingFlagIcon from '../../assets/images/marketplace/coding-flag.png'
const { TabPane } = Tabs

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;

`

export const NFTDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px orange solid;

`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  position: relative;
  object-fit: cover;
  border: 1px green solid;
  

  img {
    width: 100%;
    height: 80vh;
    object-fit: contain;
    border-radius:10px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 5vw;
    border: none;
    height: 100%;
    width: 100vw;

    img {
      height: 50vh;
      width: 80vw;
      object-fit: cover;
    }
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  border: 1px red solid;
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

export const NFTBaseInfoContainer = styled.div`
  height: fit-content;
  width: 100% ;
  padding: 0 0 0 50px;
  
  .nft-name {
    font-size: 30px;
    font-weight: bolder;
    color: #94DAFF;
    margin-bottom: 5px;
  }
  
  .text {
    font-size: 14px;
    display: flex;
    margin: 10px 0;
    color: #00EBA4;
    font-weight: bolder;
    
    .price {
      margin-left: 10px;
    }
  }


  .description {
    height: 120px;
    overflow-y: scroll;
    font-size: 16px;
    font-weight: 400;
    color: #7C6DEB;
    line-height: 22px;
  }

  .nft-info-container {
   display: flex;
   flex-direction: column;
   color: #94DAFF;

    .nft-info-container-item {
     align-items: center;
     font-size: 18px;
     
     .info-favorite {
      display: flex;
       
       img {
         width: 20px;
       }
     }


     .nft-info-container-label {
        font-weight: bolder;
        padding-right: 14px;
      }

      .nft-info-container-value {
        font-weight: 500;
        color: #94DAFF;
        user-select: none;
        font-size: 14px;
        margin-bottom: 20px;
        max-height: 100px;

      }

      .icon-copy {
        margin-left: 0.5rem;
        color: #94DAFF;
        cursor: pointer;
      }

     .icon-favorite {
      width: 25px;
      height: 16px;
      display: flex;
      align-self: center;
      margin-right: 5px;
     }
      
      .tabs-container {
        display: flex;
        flex-direction: column;
        
        .label {
          color: #94DAFF;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .value {
          color: #94DAFF;
          font-size: 16px;
          font-weight: bolder;
          margin-bottom: 30px;
          
          img {
            width: 40px;
            border-radius: 30px;
            background: #282c34;
            margin-right: 15px;
          }
        }
      }
    }
  }

  

  @media screen and (max-width: 600px) {
    display: flex;
    justify-content: center;

    .nft-name {
      width: fit-content;
      font-size: 4.5rem;
      font-weight: 550;
      color: #94DAFF;
      padding: 5vh 0;
    }

    .line {
      margin-bottom: 5vh;
      width: 80vw;
      border-bottom: solid 0.2rem #787A91;
    }
  }
`

export const StyledTab  = styled(Tabs)`
  user-select: none;
  .ant-tabs-tab {
    color: #608599 !important;
    font-weight: bolder;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #94DAFF !important;

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
`

export const CenterRow = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Title = styled.div`
 font-size: 26px;
 font-weight: 550;
 color: #94DAFF;
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
  color: #94DAFF;
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

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
    width: 100vw !important;

    .artwork-group {
      margin-left: calc((100vw - 22rem) / 2);
      margin-bottom: 5vh;
    }
  }
`

export const Operating = styled.div`
  width: 100%;
  display: flex;
  height: fit-content;

 
  @media screen and (max-width: 1000px) {
    display: flex;
    justify-content: center;
  }
`

export const TradingContainer = styled.div`
  width: 100%;
`
