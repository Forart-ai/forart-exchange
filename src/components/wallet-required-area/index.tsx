import React from 'react'
import { Box, Button, ButtonProps, Tooltip } from '@mui/material'
import { useSolanaWeb3 } from '../../contexts/solana-web3'
import { useModal } from '../../contexts/modal'
import WalletSelectionModal from '../wallet/WalletSelectionModal'

const WalletRequiredArea:React.FC<ButtonProps> = props => {
  const { account } = useSolanaWeb3()
  const { openModal } = useModal()

  const prop = { ...props }
  return (
    <div>
      {
        !account ? (
          <Tooltip title={'Please connect the wallet'} placement={'top'}>
            <div onClick={() => openModal(<WalletSelectionModal />)}>{prop.children}</div>
          </Tooltip> ) :
          (
            <div>{prop.children}</div>
          )

      }
    </div>
  )
}

export { WalletRequiredArea }
