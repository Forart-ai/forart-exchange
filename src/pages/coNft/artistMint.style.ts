import styled from 'styled-components'
import { Image, Tabs } from 'antd'

export const MintWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  

`

export const TopContainer = styled.div `
  width: 100%;
  height: 600px;
  display: flex;
  padding: 0 100px;
  justify-content: center;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`

export const BodyContent = styled.div `
  width: 600px;
  height: 100%;
  display: flex;
  background: #170A16;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;

  @media screen and (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    height: 400px;
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

  .swiper-slide {
    width: auto;
  }
  
  @media screen and (max-width: 1100px) {
    height: 30%;
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
  height: 100%;
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
  
`

export const KitContent = styled.div`
  width: 750px;
  height: 100%;
  background: #1E052D;
  border-radius: 20px;
  position: relative;
  padding: 15px 20px;
  margin-left: 20px;
  overflow-y: scroll;
  

  @media screen and (max-width: 1080px) {
    width: 100%;
    height: 800px;
    margin: 0
    
  }
`
export const AttrContent = styled.div`
  width: 100%;
  margin-bottom: 40px;
`

export const AttrType = styled.div`
    font-family: inter-extraBold;
  color: #E5E8EB;
  font-size: 1.2rem;
  margin: 5px 0;
`

export const MintTab = styled(Tabs)`
  font-size: 1.1em;
  .ant-tabs-tab {
    font-size: 1.1em !important;
    color: #E5E8EB !important;
    font-family: 'inter' !important;

  }


  .ant-tabs-nav-list {
    border: none !important;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #E42575 !important;
    border-radius: 25px;
    background-color: transparent !important;

    span {
      margin: 5px 10px;
    }
  }
  

  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;
  }

  .ant-tabs-nav::before {
    border-bottom: 1px #65727b solid;

  }

  .ant-tabs-ink-bar {
    background: linear-gradient(to right, #E42575, #4A0E6F) border-box;
    padding: 2px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    display: table !important;
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


  @media screen and (max-width: 1080px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, auto);
    grid-template-rows: repeat(auto-fill, auto);
    justify-content: center;
    align-items: center;
    height: auto;
  }
`

export const KitListContainer = styled.div`
  display: grid;
  justify-content: space-between;
  grid-template-rows: repeat(auto-fill,auto);
  grid-template-columns: repeat(auto-fill, 140px);
  grid-gap: 5px;
  width: 100%;
  height: 100%;
  //max-height: 520px;

  
  
  
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
