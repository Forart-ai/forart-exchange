import React from 'react'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import Text from '../../../../../contexts/theme/components/Text/Text'
import { useWeb3React } from '@web3-react/core'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { shortenAddress } from '../../../../../utils'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import BindEthAndSolanaWallet from './bindEthAndSolanaWallet'

const FinalReconfirmation:React.FC = () => {
  const { account: ethAccount } = useWeb3React()
  const { account: solAccount } = useSolanaWeb3()

  return (
    <Flex flexDirection={'column'}>
      <BindEthAndSolanaWallet onBound={() => true} />
    </Flex>
  )
}

export default FinalReconfirmation
