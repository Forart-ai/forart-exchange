import React, { useCallback } from 'react'
import styled from 'styled-components'
import {  Button } from 'antd'
import HypeteenIcon from '../../assets/images/artistDetail/hypeteenIcon.png'
import { useGetOverview } from '../../hooks/queries/useGetOverview'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import DonateDialog from '../../components/modals/donation/donate-dialog'
import { useDonation } from '../../hooks/programs/useDonation'
import Basckground from '../../assets/images/coPools/banner.png'

const Wrapper = styled.div`
  height: 500px;
  width: 100%;
  background: url(${Basckground}) no-repeat;
  position: relative;
  background-size: cover;
  text-align: center;
  background-position: 50%;
  
  .cover {
    width: 100%;
    height: 100%;
    background: rgb(1, 0, 29);
    position: absolute; 
    left: 0px;
    top: 0px;
    z-index: 2;
    opacity: 0.57;
  }
  .blur-background {
    position: absolute;
    width: 100%;
    height: 60px;
    bottom: 0;
    background: linear-gradient(0deg, rgb(0, 0, 0) 33%, rgba(0, 0, 0, 0) 100%);
  }
  @media screen and (max-width: 1080px) {
    height: 450px;
  }
`

const MainContainer = styled.div`
  height: 100%;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  position: relative;
  
  
  
  @media screen and (max-width: 1080px) {
    padding: 10px;
  }
`

const DonateArea = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
`

const MainArea = styled.div`
  max-width: 570px;
  height: 60%;
  display: flex;
  justify-content: center;
  flex-direction: column;


  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    
    img {
      width: 80px;
      object-fit: cover;
      border-radius: 50%;
    }
    
    span {
      margin-left: 20px;
      font-family: inter-extraBold;
      color: #ffffff;
      font-size: 3.4em;
    }
  }
  
  .info-message {
    margin-top: 20px;
    text-align: center;
    color: #c2c2c2;
    font-size: 1.2em;
  }
  
  @media screen and (max-width: 1080px) {
    height: 70%;
    .top {
      flex-direction: column;

      span {
        margin-left: 0;
        font-family: inter-extraBold;
        color: #ffffff;
        font-size: 1.4em;
      }
    }

    .info-message {
      text-align: center;
      padding: 0 10px;
      font-size: 1.2em;
    }
  }
`

const DataArea = styled.div`
  width: 40%;
  height: 20%;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1080px) {
    width: 100%;
    height: 17%;
  }
`

const DataItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 1em;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, rgb(18, 12, 24), rgb(18, 12, 24)), linear-gradient(140deg, #ff4090, #578AEF);

  .data {
    font-size: 1.1em;
    color: #f2f2f2
  }
  
  @media screen and (max-width: 1080px) {
    text-align: center;
  }
  
`

const ArtistInfo:React.FC = () => {
  const { data: overviewData } = useGetOverview()
  const { poolDonated } = useDonation()

  const { openModal } = useModal()

  const openDonateModal = useCallback(() => {
    openModal(<DonateDialog />)
  },[])

  return (
    <Wrapper>
      <div className="cover" />
      <MainContainer >
        <DonateArea>
          <Button onClick={openDonateModal}> Donate </Button>
        </DonateArea>
        <MainArea>
          <div className="top">
            <img src={HypeteenIcon} />
            <span> Hypeteen</span>
          </div>
          <div className="info-message">
            The Degenerate Ape Academy is an NFT brand housed on the Solana blockchain. The academy consists of 10,000 degenerate ape NFTs.
          </div>
        </MainArea>
        <DataArea>
          <DataItem>
            <div className="data">
              Created: {overviewData?.minted}/2000
            </div>
          </DataItem>
          <DataItem>
            <div className="data">
              Creators: {overviewData?.mintedWallet}/2000
            </div>
          </DataItem>
          <DataItem>
            <div className="data">
              Donated: {poolDonated ? poolDonated?.data?.toString() : '-'} USDC
            </div>
          </DataItem>
        </DataArea>
      </MainContainer>
      <div className="blur-background" />
    </Wrapper>
  )
}

export default ArtistInfo
