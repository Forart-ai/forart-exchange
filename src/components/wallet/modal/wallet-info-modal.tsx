import React, { useCallback } from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/material'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { shortenAddress } from '../../../utils'
import { DEFAULT_CLUSTER } from '../../../contexts/solana-connection-config'
import { useModal } from '../../../contexts/modal'
import { disconnect } from 'cluster'
import { useHistory } from 'react-router-dom'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: Kanit-Light;
`

const Message = styled('div')`
  font-size: 18px;
  color: #ffffff;
`

const WalletInfoModal:React.FC<{ account?: string; disconnect: VoidFunction }> = ({ account, disconnect }) => {

  const history = useHistory()
  const { closeModal } = useModal()

  const disconnectWallet = () => {
    disconnect()
    closeModal()
    history.push('/')
  }

  return (
    <Dialog title={' Your Wallet'} closeable={true} onCancel={ disconnectWallet } cancelButtonProps={{ children: 'Disconnect' }}>
      <Wrapper>
        <Message>You are now connected to {shortenAddress(account)}</Message>
        <Message> Current network: {DEFAULT_CLUSTER } </Message>
      </Wrapper>
    </Dialog>
  )
}

export default WalletInfoModal
