import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
// @ts-ignore
import { Button, Dropdown, Menu, Modal } from 'antd'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { PublicKey } from '@solana/web3.js'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from './WalletSelectionModal'
import WalletInfoModal from './modal/wallet-info-modal'
import { styled } from '@mui/material'

const StyledWallet = styled('div')`
  height: 38px;
  color: #fff;
  display: flex;
  justify-content: center; 
  align-items: center;
  border-radius: 30px;
  padding: 0 10px;
  //margin-right: 20px;
  cursor: pointer;
  min-width: 120px;
  padding: 0 10px;
font-family: Kanit-Regular;
  font-size: 16px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image:  linear-gradient(90deg, #50DCB4, #8246F5, #C86EFF);

  .wallet-add {
    display: flex;
    align-items: center;
  }
  
 
  
`

type CurrentAccountProps = {
  account: string | null | undefined
  solanaAccount: undefined | PublicKey
}

const CurrentAccount: React.FC<CurrentAccountProps> = ({ account, solanaAccount }) => {

  const { openModal } = useModal()
  const {  disconnect } = useSolanaWeb3()

  return (
    <StyledWallet onClick={() => openModal(<WalletInfoModal account={solanaAccount?.toBase58().toString()} disconnect={disconnect} />)}>
      {
        account &&
          (
            <>

              {`${account.substr(0,5)}...${account.substr(-4,4)}`}

            </>
          )
      }
      {
        solanaAccount &&
          (
            <>
              {`${solanaAccount.toBase58().substr(0,5)}...${solanaAccount.toBase58().substr(-4,4)}`}
            </>
          )
      }
    </StyledWallet>
  )
}

export const ConnectToWallet = () => {
  const { openModal } = useModal()

  const openWallet = useCallback(() => {
    openModal(<WalletSelectionModal />)
  },[])

  return (
    <StyledWallet onClick={openWallet}>
      <span>Connect To Wallet</span>
    </StyledWallet>
  )
}

const Wallet: React.FC = () => {
  const { account: solanaAccount } = useSolanaWeb3()
  const { account } = useWeb3React()

  return (
    <>
      { (!account && !solanaAccount ) && <ConnectToWallet /> }
      { (!!account || !!solanaAccount) && <CurrentAccount account={account} solanaAccount={ solanaAccount } /> }
    </>
  )
}

export default Wallet
