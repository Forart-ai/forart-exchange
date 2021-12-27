import styled from 'styled-components'
import { Button, Image, Tabs } from 'antd'

const { TabPane } = Tabs

export const MintWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

`

export const TopContainer = styled.div `
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
`

export const BodyContent = styled.div `
  width: 49%;
  height: auto;
  display: flex;
  background: #070E1E;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`

export const SwiperList = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  
`

export const ImageBorder = styled.div`
  width: 100%;

`

export const KitImageBorder = styled.div`
  width: 100%;
 
`




export const StyledImage = styled(Image)`
  background: #0f1b39;
  border-radius: 10px;
  position: relative;
  
`

export const SelectedBody = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #0f1b39;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  z-index: 1;
  
  img {
    width: 80%;
    height: 80%;
  }
  
  
`

export const PriceContainer = styled.div`
  
    width: 100%;
    height: 10%;
    display: flex;
    padding: 0 40px;
    justify-content: space-between;
    align-items: center;
    background: #060c21;
    position: relative;
  border-radius: 10px;

    &:before {
      content: '';
      position: absolute;
      border-radius: 10px;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: #fff;
      //opacity: 0.1;
      z-index: -1;
      //border: 2px #fff solid;
      //filter: blur(5px);
    }
  
  &:before,
  &:after {
    
    background: linear-gradient(235deg, #12dbe4, #060c21, #02fbab);

  }



    .price {
    z-index: 5;
    background: linear-gradient(90deg ,#12dbe4, #02fbab);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.4rem;
  }
`

export const KitContent = styled.div`
  width: 49%;
  height: auto;
  background: #070E1E;
  border-radius: 20px;
  
`

export const MintTab = styled(Tabs)`

  //width: 100%;
  user-select: none;

  .ant-tabs-tab {
    font-size: 1rem;
    color: #E5E8EB !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #94DAFF !important;

  }

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: start; !important;
  }

  .ant-tabs-nav::before {
    //display: none; !important;
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    //line-height: 161px;
    background-image: linear-gradient(to right, #00EBA4, #02A6F5);
    padding: 2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  @media screen and (max-width: 1100px) {
    .ant-tabs-tab {
      font-size: 16px;
    }
  }
`

export const MintContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
`

export const KitListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  
`

export const CenterContainer = styled.div`
  width: 100%;
`

export const MintButton = styled(Button)``
