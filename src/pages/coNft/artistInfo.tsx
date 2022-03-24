import React, { useCallback } from 'react'
import styled from 'styled-components'
import {  Button } from 'antd'
import HypeteenIcon from '../../assets/images/artistDetail/hypeteenIcon.png'
import { useGetOverview } from '../../hooks/queries/useGetOverview'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../../components/wallet/WalletSelectionModal'
import DonateDialog from '../../components/modals/donation/donate-dialog'
import { useDonation } from '../../hooks/programs/useDonation'

const Wrapper = styled.div`
  height: 400px;
  width: 100%;

  @media screen and (max-width: 1080px) {
    height: 450px;
  }
`

const MainContainer = styled.div`
  height: 100%;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  width: 100%;
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
    padding: 0 50px;
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
    </Wrapper>
  )
}

export default ArtistInfo
