import { styled } from '@mui/material'

export const Wrapper = styled('div')`
  width: 260px;
  //border-top-left-radius: 20px;
  //border-top-right-radius: 20px;
  border-radius: 20px;
  position: relative;
  background-color: #28005A;
  font-family: Arial;
  display: flex;
  flex-direction: column;
  
  .nft-container {
    height: 220px;
    width: 220px;
    cursor: pointer;
    margin: 0 auto;

    .spin {
      position: absolute;
      top: 50%;
    }

    img {
      margin-top: 15px;
      object-fit: contain;
      width: 95%;
      height: 95%;
      border-radius: 20px;
    }
  }
 
  
  .status {
    height: 210px;
    font-size: 1.3em;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

`

export const NFTInfo = styled('div')`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Owner = styled('div')`
  border-left: 2px ${({ theme }) => theme.palette.primary.main} solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .label {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main} ;
  }
  
  .username {
    font-family: arialBold;
    font-size: 18px;
    color: #ffffff ;
  }
  
  .solana-icon {
    width: 20px;
  }
`

export const Messages = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`

export const Grid = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: space-between;


  .label {
    color: #ffffff;
    font-size: 14px;
  }
  
  .account {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main} ;
    display: flex;
  }
  
`

export const PriceContainer = styled('div')`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    font-size: 18px;
   
    color: #ffffff ;
  }
  
  .value {
    font-size: 18px;
    font-family: Aldrich-Regular;
    color: ${({ theme }) => theme.palette.primary.main} ;
  }
`
