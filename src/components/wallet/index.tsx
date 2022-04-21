import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components'
// @ts-ignore
import { Button, Dropdown, Menu, Modal } from 'antd'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { PublicKey } from '@solana/web3.js'
import { DownOutlined } from '@ant-design/icons'
import useConnectedWallet from '../../hooks/useGetCurrentWallet'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from './WalletSelectionModal'
import WalletInfoModal from './modal/wallet-info-modal'

const StyledWallet = styled.div`
  height: 40px;
  color: #fff;
  display: flex;
  justify-content: center; 
  align-items: center;
  border-radius: 30px;
  padding: 0 10px;
  //margin-right: 20px;
  cursor: pointer;
  min-width: 170px;
  width: 180px;

  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image:  linear-gradient(90deg, #50DCB4, #8246F5, #C86EFF);

  .wallet-add {
    display: flex;
    align-items: center;
  }
  
`

const MenuContainer = styled.div`
  height: 200px;
  width: 180px;


  .ant-menu {
    position: relative;
    background-color: #1D222D;
    border-radius: 10px;
    border: 3px #271d28 solid;
    height: 70px;
    width: 100%;

    top: 10px;
  }

  .menu-box {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 10px 0;


    .disconnect {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 90%;
      height: 40px;
      font-size: 1.2em;
      font-weight: bold;
      color: white;
      background-color: rgb(221, 52, 68);
      border-radius: 8px;
    }
  }


`

type CurrentAccountProps = {
  account: string | null | undefined
  solanaAccount: undefined | PublicKey
}

const MetamaskIcon: React.FC = () => {
  const ref =useRef<HTMLDivElement>()
  const { account } = useWeb3React()

  return (
    <div>
      <div className="userIcon" style={{ display:'flex', marginRight:'15px' }} ref={ref as any} />
    </div>
  )
}

const WalletContent: React.FC<CurrentAccountProps> =({
  account
}) => {
  const { disconnect } = useSolanaWeb3()
  const { deactivate } = useWeb3React()

  const { library, chainId } = useWeb3React()

  const [, setBalance] = useState()

  useEffect(():any => {
    if (!!account && !!library) {
      let stale = false

      // library.getBalance(account)
      //   .then((balance:any) => {
      //     if (!stale) {
      //       setBalance(balance)
      //       console.log(formatEther(balance))
      //     }
      //   })
      //   .catch(() => {
      //     if (!stale) {
      //       // @ts-ignore
      //       setBalance(null)
      //     }
      //   })

      return () =>{
        stale = true
        setBalance(undefined)
      }
    }

  },[account, library,chainId])

  return (
    <MenuContainer>
      <Menu>
        <div className="menu-box">
          <div className= "disconnect" onClick={account ? deactivate : disconnect}  > Disconnect </div>
        </div>
      </Menu>
    </MenuContainer>

  // <BalanceContainer>
  //   <div className="balance">{account}</div>
  //   {/*<div>{balance !== undefined ? `${formatEther(balance)}` : ''}</div>*/}
  // </BalanceContainer>

  )
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
