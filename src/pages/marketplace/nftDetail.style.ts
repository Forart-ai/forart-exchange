// @ts-ignore
import styled from 'styled-components'
import { Button } from 'antd'

export const Wrapper = styled.div`
  width: 100%;
  height: 1300px;
  display: flex;
  justify-content: center;

`

export const NFTDetailContainer = styled.div`
  width: 1000px;
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
 margin-bottom: 45px;
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 375px;
  height: 450px;
  border-radius: 2rem;
  justify-content: center;
  position: relative;
  object-fit: cover;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
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
  width: 600px;

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
  width:100% ;
  
  .nft-name {
    font-size: 42px;
    font-weight: 550;
    color: #94DAFF;
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
     display: flex;
     flex-direction: row;
     align-items: center;
     font-size: 18px;
     
     .info-favorite {
      display: flex;
     }


     .nft-info-container-label {
        font-weight: 550;
        padding-right: 14px;
      }

      .nft-info-container-value {
        font-weight: 500;
        color: #94DAFF;
        user-select: none;
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

export const StyledButton = styled(Button)`
 margin: 10px 0; 
 width: 220px;
 height: 40px;
 background: #282c34;
 color: #FFFFFF;
 border-radius: 10px;
 font-size: 18px;
 font-weight: 500;
 

 &[disabled] {
  background: rgba(48, 80, 153, 0.55) !important;
  color: #999;
 }
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
 width: 375px;
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 height: 300px;
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
  width: 600px;
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
