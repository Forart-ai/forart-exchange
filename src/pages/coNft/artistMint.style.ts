import styled from 'styled-components'
import { Image, Tabs } from 'antd'

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
  
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    height: auto;
  }
`

export const BodyContent = styled.div `
  width: 45%;
  height: 100%;
  display: flex;
  background: #170A16;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1100px) {
    width: 100%;
    flex-direction: column;
    height: 350px;
    justify-content: center;
    align-items: center;
  }
`

export const SwiperList = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  position: relative;

  .navigation {
    z-index: 2;
    opacity: .8;
   
    
    .down-arrow {
      position: absolute;
      bottom: -25px;
      left: 40px;
      cursor: pointer;
    }

    .up-arrow {
      position: absolute;
      top: -25px;
      left: 40px;
      cursor: pointer;

    }
    img {
      width: 50px;
    }
  }
  
  @media screen and (max-width: 1100px) {
    width: 100%;
    .down-arrow, .up-arrow {
      display: none;
    }
  }
  
`

export const ImageBorder = styled.div`
  width: 100%;
`

export const KitImageBorder = styled.div`
  width: 100%;
  cursor: pointer;
 
`

export const StyledImage = styled(Image)`
  background: #1E052D;
  border-radius: 10px;
  position: relative;

`

export const SelectedBody = styled.div`
  width: 100%;
  height: 100%;
  background: #1E052D;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
  }
  
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`

export const KitContent = styled.div`
  width: 53%;
  height: 100%;
  background: #02060e;
  border-radius: 20px;
  position: relative;
  
  .more-icon {
    position: absolute;
    right: 2px;
    top: 10px;
    //z-index: 5;
    
    img {
      width: 30px;
    }
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
    margin-top: 20px;
  }
`

export const MintTab = styled(Tabs)`

  .ant-tabs-tab {
    font-size: 1.2em !important;
    color: #E5E8EB !important;
    overflow-x: scroll;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #FF468B !important;
  }

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: start;!important;
  }

  .ant-tabs-nav::before {
    display: none; !important;
  }

  .ant-tabs-ink-bar {
    //line-height: 161px;
    background: linear-gradient(to right, #FF468B, #12dbe4) border-box;
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
  height: 100%;
  
  @media screen and (max-width: 1100px) {
    height: auto;
  }
`

export const KitListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-height: 520px;
  overflow: scroll;


  ::-webkit-scrollbar {
    display: revert;
    width: 5px; !important;
    height: 100%;
  }
  
  @media screen and (max-width: 1100px) {
  }


`

export const CenterContainer = styled.div`
  width: 100%;
`

export const MintButton = styled.div`
  width: 100%;
  text-align: center;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  a{
    margin-left: 20px;
    color: #FF468B;
  }
  
  p {
    color: #FF468B;
    font-size: 1.4em;
  }
`

export const AIContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  .title{
    font-size: 2.5em;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
`

export const StyledSwitch = styled.div`
  margin-left: 20px;
  .ant-switch {
    background-color: #02A6F5;
  }
  
   .ant-switch-checked {
    background-color: #00EBA4 ;
  }
`

export const AIContent = styled.div`
  height: auto;
  .hide {
    display: none;
  }
`

export const ItemContainer = styled.div`
  margin-bottom: 30px;
  
  .title {
    font-size: 2.5em;
    color: #ffffff;
  }

  .ant-input {
    &::placeholder {
      color: #ccc;
    }

    height: 36px ;
    background: #2A2E35 !important;
    border-radius: 10px !important;
    border: none;

    font-size: 1.2em;
    font-weight: 500 !important;
    color: white !important;
    line-height: 20px !important;
  }
`
