import React, { useState } from 'react'
import styled from 'styled-components'
import { CloseButton, useModal } from '../../../contexts/modal'
import WarningIcon from '../../../assets/images/modalImages/warning.svg'
import { useWeb3React } from '@web3-react/core'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { Button, InputNumber, notification } from 'antd'
import { useDonation } from '../../../hooks/programs/useDonation/index'
import WalletSelectionModal from '../../wallet/WalletSelectionModal'
import BigNumber from 'bignumber.js'
import { USDC_TOKEN_DECIMALS } from '../../../hooks/programs/useDonation/constants'
import { shortenAddress } from '../../../utils'
import notify from '../../../utils/notify'

const Wrapper = styled.div`
  width: 750px;
  max-width: 98vw;
  border-radius: 10px;
  position: relative;
  border: 4px solid transparent;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, rgb(27, 3, 42), rgb(27, 3, 42)), linear-gradient(90deg, #ff4090, #3c69c2);
 
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: inter-extraBold;
  color: #f2f2f2;
  padding: 20px 0 0 40px;
`

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding:15px 20px;
  
  @media screen and (max-width: 1080px) {
    padding: 10px 0;
  }

`

const TopArea = styled.div`
  display: flex;
  align-items: center;
  color: #f2f2f2;
  font-size: .7em;

  .text {
    b{
      color: #ff468b;
    }
  }
  img {
    padding: 20px;
    width: 100px;
  }
`

const CenterArea = styled.div`
  display: flex;
  align-items: center;
  color: #f2f2f2;
  font-size: .7em;
  
  .empty {
    padding: 20px;
    width: 100px;
  }
  img {
    padding: 20px;
    width: 100px;
  }
  
  .account {
    display: flex;
    flex-direction: column;
    
    .row {
      display: flex;
      b{
        margin-right: 10px;
      }
    }
  }
`

const BottomArea = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  
  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`

const DonateCol = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  font-size: .7em;
  margin-bottom: 10px;
  
  @media screen and (max-width: 1080px) {
    flex-direction: row;
  }
`

const StyledInput = styled.div`
  .ant-input-number {
    background: rgb(54, 25, 74);
    color: #ffffff;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
`

const DonateButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const DonateDialog: React.FC = () => {
  const {  openModal, closeModal } = useModal()
  const { account, wallet } = useSolanaWeb3()

  const { donate, userDonated } = useDonation()
  const [loading, setLoading] = useState<boolean>(false)

  const [amount, setAmount] = useState('1')

  const handleDonate = () => {
    setLoading(true)
    if (!account) {
      notify({
        message:'Oops!',
        description:'Please connect to Solana wallet',
      })
      return
    }
    donate({ donateAmount: amount }).then(() => setLoading(false))
      .catch(err => {
        console.log(err)})
  }

  const limitNumber = (value:any) => {
    return !isNaN(Number(value)) ? value.replace(/^(0+)|[^\d]/g, '') : ''

  }

  return (
    <Wrapper>
      <CloseButton onClick={closeModal} />

      <Title>Donate for this artist</Title>

      <MainContainer>
        <TopArea>
          <img src={WarningIcon} />
          <div className="text" >Your first donate towards a artist costs <b>1 USDC</b> inthis round.According to quadratic funding algorithm,
            your n-th donate towards the same artist costs 1 x n USDCs.
          </div>
        </TopArea>
        <CenterArea>
          {
            wallet?.icon ?
              <img src={wallet.icon} />
              :
              <div className="empty" />
          }
          <div className="account" >
            <div className="row">
              <b>Network: </b>
              <div>Solana</div>
            </div>
            <div className="row">
              <b>Address: </b>
              <div>{account ? shortenAddress(account.toBase58()) : '-'}</div>
            </div>
          </div>
        </CenterArea>
        <BottomArea>
          <DonateCol>
            <div> Donate for this artist</div>
            <StyledInput>
              <InputNumber
                bordered={false}
                precision={0}
                defaultValue={1}
                min={1}
                formatter={limitNumber}
                parser={limitNumber}
                onInput={r => {
                  setAmount(r)
                }}
              />
              USDC
            </StyledInput>

          </DonateCol>
          <DonateCol>
            <div>Donates you have given:</div>
            <div>{userDonated ? userDonated.data?.toString() : '0'}USDC</div>
          </DonateCol>
        </BottomArea>
        <DonateButton>
          {
            account ? (
              <Button loading={loading} disabled={!amount} style={{  width:'300px' }} onClick={handleDonate}>Donate</Button>

            ) :
              <Button onClick={() => openModal(<WalletSelectionModal />)}>Connect to wallet</Button>
          }
        </DonateButton>
      </MainContainer>
    </Wrapper>
  )
}

export default DonateDialog

