import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: rgb(13,14,45);
  height: 100%;
  width: 100%; 
  min-height: 150vh;
`
export const  NFTInfo = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 60px 0;


  @media screen and (max-width: 1080px) {
    flex-direction: column;
    height: fit-content;
  }
`

export const Canvas = styled.div`
  background-color: rgb(13,14,45);
  padding: 20px;
  height: 100%;
  width: 80%;
  max-width: 1870px;
  display: flex;
  flex-direction: column;
  alig-items: center;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    width: calc(100vw - 10px);
    padding: 5px;
  }

`

export const LeftArea = styled('div')`
  width: 460px;
  height:  460px;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  margin-right: 20px;
  

  img {
    border: 1px rgba(153, 153, 153, .6) solid;
    background-color: rgba(153, 153, 153, .15);
    padding: 20px;
    width: 100%;
    border-radius: 30px;
  }

  @media screen and (max-width: 1080px) {
    margin: 0 auto;
    height: 80%;
    width: 80%;
  }
`
export const RightArea = styled('div')`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;


  @media screen and (max-width: 1080px) {
    width: 100%;
  }
  

  
`

export const RightTopArea = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 25%;
  margin-bottom: 20px;


  
`

export const TopTitle = styled('div')`
  font-family: arialBold;
  width: 100%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;


  .name {
    color: #8246F5;
  }

  @media screen and (max-width: 1080px) {
    margin-top: 10px;
    font-size: 26px;
  }
  
`

export const RightBottomArea = styled('div')`
  height: 70%;
`

export const Rainbow = styled('div')`
  display: flex;
  font-size: 16px;
  align-items: center;

  .wallet {
    color: #A197AA;
    margin-left: 10px;
  }

  span {
    border: 1px #EB1482 solid;
    padding: 2px 4px;
    border-radius: 5px;
    font-weight: bold;
    display: table;
    background: -webkit-linear-gradient(90deg, #EB1482 50.04%, #CD19B9 50.01%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .label {
    color: #c1a3ff;
    margin: 0 10px;
  }
`

export const SeriesTitle = styled('div')`
  color: #A197AA;
  font-size: 18px;
  font-family: arialBold;
  margin-bottom: 16px;
`

export const Options = styled('div')`
  display: flex;
  align-items: center;
  
  img {
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
}
  span {
    font-size: 14px;
    font-family: KronaOne-Regular; 
  }
`
