import React, { useState } from 'react'
import styled from 'styled-components'
import { CloseButton, useModal } from '../../../../../contexts/modal'
import WarningIcon from '../../../../../assets/images/modalImages/warning.svg'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { Button, InputNumber, notification } from 'antd'
import { useDonation } from '../../../../../hooks/programs/useDonation'
import WalletSelectionModal from '../../../../../components/wallet/WalletSelectionModal'
import { shortenAddress } from '../../../../../utils'
import notify from '../../../../../utils/notify'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { DonationError, DonationSuccess } from './donation-info'
import Rocket from '../../../../../assets/images/coPools/rocket.png'

const Wrapper = styled.div`
 
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
  width: 800px;
  height: 480px;
  max-width: 98vw;
  display: flex;
  justify-content: space-between;
  
  @media screen and (max-width: 1080px) {
    padding: 10px 0;
  }

`

const RightArea = styled('div')`
  width: 280px;
  height: 100%;
  background: url(${Rocket}) no-repeat;
  position: relative;
  background-size: cover;
`

const LeftArea = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TopArea = styled.div`
  display: flex;
  align-items: center;
  color: #f2f2f2;
  font-size: .7em;

  .text {
   a, b{
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

const Message = styled.div`
  width: 100%;
  color: #ffffff;
  font-size: 12px;
`

const DonateDialog: React.FC = () => {
  const {  openModal, closeModal } = useModal()
  const { account, wallet } = useSolanaWeb3()

  const { donate, userDonated, userAta } = useDonation()
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
      .then(() => openModal(<DonationSuccess />))
      .catch(err => {
        openModal(<DonationError err={err.message || err.toString()} />)
        setLoading(false)
      })
  }

  const limitNumber = (value:any) => {
    return !isNaN(Number(value)) ? value.replace(/^(0+)|[^\d]/g, '') : ''

  }

  return (
    <Dialog title={''} closeable={true}>
      <MainContainer>
        <RightArea />
        {/*<LeftArea>*/}
        {/*  <Title>Donate for this artist</Title>*/}

        {/*  <TopArea>*/}
        {/*    <img src={WarningIcon} />*/}
        {/*    <div className="text" >*/}
        {/*      <p>*/}
        {/*        Your first donate towards a artist costs <b>1 USDC</b> in this round.*/}
        {/*        your n-th donate towards the same artist costs  <b>1 x n USDCs.</b>*/}
        {/*      </p>*/}
        {/*      <p>You can also view the <a href={'https://medium.com/@Forart.ai/donate-guide-fdd7a631a23a' } rel={'noreferrer'} target={'_blank'}>donating guide {'>'}</a>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </TopArea>*/}
        {/*  <CenterArea>*/}
        {/*    {*/}
        {/*      wallet?.icon ?*/}
        {/*        <img src={wallet.icon} />*/}
        {/*        :*/}
        {/*        <div className="empty" />*/}
        {/*    }*/}
        {/*    <div className="account" >*/}
        {/*      <div className="row">*/}
        {/*        <b>Network: </b>*/}
        {/*        <div>Solana</div>*/}
        {/*      </div>*/}
        {/*      <div className="row">*/}
        {/*        <b>Address: </b>*/}
        {/*        <div>{account ? shortenAddress(account.toBase58()) : '-'}</div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </CenterArea>*/}
        {/*  <BottomArea>*/}
        {/*    <DonateCol>*/}
        {/*      <div> Donate for this artist</div>*/}
        {/*      <StyledInput>*/}
        {/*        <InputNumber*/}
        {/*          bordered={false}*/}
        {/*          precision={0}*/}
        {/*          defaultValue={1}*/}
        {/*          min={1}*/}
        {/*          formatter={limitNumber}*/}
        {/*          parser={limitNumber}*/}
        {/*          onInput={r => {*/}
        {/*            setAmount(r)*/}
        {/*          }}*/}
        {/*        />*/}
        {/*        USDC*/}
        {/*      </StyledInput>*/}

        {/*    </DonateCol>*/}
        {/*    <DonateCol>*/}
        {/*      <div>Donates you have given:</div>*/}
        {/*      <div>{userDonated ? userDonated.data?.toString() : '0'}USDC</div>*/}
        {/*    </DonateCol>*/}
        {/*  </BottomArea>*/}
        {/*  <DonateButton>*/}
        {/*    {*/}
        {/*      account ? (*/}
        {/*        <Button loading={loading} disabled={!amount} style={{  width:'300px' }} onClick={handleDonate}>Confirm</Button>*/}

        {/*      ) :*/}
        {/*        <Button onClick={() => openModal(<WalletSelectionModal />)}>Connect to wallet</Button>*/}
        {/*    }*/}
        {/*  </DonateButton>*/}
        {/*</LeftArea>*/}
      </MainContainer>
    </Dialog>
  )
}

export default DonateDialog

