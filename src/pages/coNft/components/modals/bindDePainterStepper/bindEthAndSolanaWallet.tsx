import React, { useCallback, useEffect } from 'react'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { useModal } from '../../../../../contexts/modal'
import { injected, networkConf } from '../../../../../web3/connectors'
import Stack from '@mui/material/Stack'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import { Checkbox, SvgIcon, Tooltip } from '@mui/material'
import { AvalancheSvg, MetamaskSvg, PhantomSvg } from '../../../../../assets/svgs/wallets'
import Text from '../../../../../contexts/theme/components/Text/Text'
import { shortenAddress } from '../../../../../utils'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import WalletSelectionModal from '../../../../../components/wallet/WalletSelectionModal'
import AvalancheImage from '../../../../../assets/images/wallets/avalanche.png'
import SolanaImage from '../../../../../assets/images/wallets/solanaLogoMark.svg'
import { styled } from '@mui/system'

const WalletIcon = styled('img') `
  width: 28px;
  height: 28px;
  object-fit: contain;
`

const BindEthAndSolanaWallet:React.FC<{onBound: (_?: boolean) => void}> = ({ onBound }) => {
  const { account: solAccount, disconnect,  } = useSolanaWeb3()
  const { account: ethAccount,deactivate,activate,connector, } = useWeb3React()
  const { openModal, updateModal } = useModal()

  useEffect(() => {
    if (solAccount && ethAccount ) {
      onBound(true)
      return
    }
    onBound(false)

  }, [solAccount, ethAccount])

  async function disconnectEthWallet() {
    try {
      deactivate()
      localStorage.setItem('isWalletConnected', 'false')
    } catch (ex) {
      console.log(ex)
    }
  }

  const connect = useCallback( () => {
    try {
      activate(injected).then(() => {
        localStorage.setItem('isWalletConnected', 'true')
      })
    }
    catch (ex) {
      console.log(ex)
    }

  }, [ activate])

  useEffect(():any => {
    const { ethereum } = window as any

    if (ethereum  && ethAccount) {
      ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConf[43114].chainId }]
      }).catch((e: any) => {
        if (e.code === 4902) {
          ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                ...networkConf[43114]
              }
            ],
          })
        }
      })
    }

  },[ethAccount])

  return (
    <Stack spacing={1} alignItems={'flex-start'} justifyContent={'flex-start'}>
      <Flex width={'100%'} justifyContent={'flex-start'} alignItems={'center'} gap={'10px'}>
        <Flex gap={1}  alignItems={'center'}>
          <WalletIcon src={AvalancheImage} />
          {
            ethAccount ?
              <Tooltip title={'click to disconnect'} placement={'right'}>
                <Text style={{ cursor:'pointer' }} onClick={disconnectEthWallet}> {shortenAddress(ethAccount,6)} </Text>
              </Tooltip>
              :
              <CustomizeButton  color={'primary'} onClick={connect}>Connect to Avalanche</CustomizeButton>
          }
        </Flex>
        <Checkbox  disabled checked={!!ethAccount} />
      </Flex>

      <Flex width={'100%'} justifyContent={'flex-start'} alignItems={'center'} gap={'10px'}>
        <Flex gap={1}  alignItems={'center'}>
          <WalletIcon src={SolanaImage} />
          {
            solAccount ?
              <Tooltip title={'click to disconnect'} placement={'right'}>
                <Text style={{ cursor:'pointer' }} onClick={disconnect}> {shortenAddress(solAccount.toBase58(),6)} </Text>
              </Tooltip>
              :
              <CustomizeButton  color={'primary'} onClick={() => openModal(<WalletSelectionModal />)}>Connect to Solana</CustomizeButton>
          }
        </Flex>
        <Checkbox  disabled checked={!!solAccount} />
      </Flex>
    </Stack>

  )
}
export default BindEthAndSolanaWallet
