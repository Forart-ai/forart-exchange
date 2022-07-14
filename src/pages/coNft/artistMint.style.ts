import { styled } from '@mui/material'

export const MintWrapper = styled('div')`
  width: 100%;
  height: fit-content;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  

`

export const TopContainer = styled('div') `
  width: 100%;
  height: 900px;
  display: flex;
  padding: 0 100px;
  justify-content: center;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: auto;
    padding: 0;
  }
`

export const BodyContent = styled('div') `
  width: 600px;
  height: 600px;
  display: flex;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  border: 1px rgba(255,255,255, .4) solid;

  @media screen and (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    height: 400px;
    justify-content: center;
    align-items: center;
  }
`

export const ImageBorder = styled('div')`
  width: 100%;
`

export const KitImageBorder = styled('div')`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

export const SelectedBody = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
  }
  
`

export const RandomHatsContainer = styled('div')`
  height: 250px;
  position: relative;
  overflow: hidden;
  background-image: -webkit-linear-gradient(left, #8246F5 , #5000B4);
  border-radius: 30px;
  
   .background{
    position: absolute;
    right: -60px;
  }
  
  .hat {
    height: 100%;
    border-radius: 30px;
  }
  
  span {
    width: calc(100% - 260px);
    font-size: 22px;
    font-family: arialBold;
    color: #ffffff;
    z-index: 3;
  }
`

export const KitContent = styled('div')`
  width: 750px;
  height: 600px;
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
export const AttrContent = styled('div')`
  width: 100%;
  margin-bottom: 40px;
`

export const AttrType = styled('div')`
  font-family: arialBold;
  color: #8246F5;
  font-size: 20px;
  padding: 10px 0;
  border-bottom: 1px #999999 solid;
  margin-bottom: 15px;
  text-align: left;
`

export const MintContainer = styled('div')`
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

export const KitListContainer = styled('div')`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 140px);
  grid-template-rows: repeat(auto-fill,auto);
  grid-gap: 5px;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1080px) {
    display: flex;
    flex-flow:row;
    flex-wrap: nowrap; 
    overflow-x: auto; 
    list-style: none;
  }
`

export const MintButton = styled('div')`
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

export const AIContainer = styled('div')`
  display: flex;
  flex-direction: column;
  
  .title{
    font-size: 2.5em;
    color: #ffffff;
    display: flex;
    align-items: center;
  }
`

export const StyledSwitch = styled('div')`
  margin-left: 20px;
  .ant-switch {
    background-color: #02A6F5;
  }
  
   .ant-switch-checked {
    background-color: #00EBA4 ;
  }
`

export const AIContent = styled('div')`
  height: auto;
  .hide {
    display: none;
  }
`

export const ItemContainer = styled('div')`
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
