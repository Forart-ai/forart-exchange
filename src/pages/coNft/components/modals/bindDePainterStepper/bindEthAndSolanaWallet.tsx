import React, { useCallback, useEffect } from 'react'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { useModal } from '../../../../../contexts/modal'
import { injected, networkConf } from '../../../../../web3/connectors'
import Stack from '@mui/material/Stack'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import { Checkbox, SvgIcon, Tooltip } from '@mui/material'
import { MetamaskSvg, PhantomSvg } from '../../../../../assets/svgs/wallets'
import Text from '../../../../../contexts/theme/components/Text/Text'
import { shortenAddress } from '../../../../../utils'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import WalletSelectionModal from '../../../../../components/wallet/WalletSelectionModal'

const BindEthAndSolanaWallet:React.FC<{onBound: (_?: boolean) => void}> = ({ onBound }) => {
  const { account: solAccount, disconnect } = useSolanaWeb3()
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
    <Stack spacing={2} alignItems={'flex-start'} justifyContent={'flex-start'}>
      <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex gap={1}  alignItems={'center'}>
          <SvgIcon><MetamaskSvg /></SvgIcon>
          {
            ethAccount ?
              <Tooltip title={'click to disconnect'} placement={'right'}>
                <Text style={{ cursor:'pointer' }} onClick={disconnectEthWallet}> {shortenAddress(ethAccount,6)} </Text>
              </Tooltip>
              :
              <CustomizeButton  color={'primary'} onClick={connect}>Connect to Metamask</CustomizeButton>
          }
        </Flex>
        <Checkbox  disabled checked={!!ethAccount} />
      </Flex>

      <Flex width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex gap={1}  alignItems={'center'}>
          <SvgIcon><PhantomSvg /></SvgIcon>
          {
            solAccount ?
              <Tooltip title={'click to disconnect'} placement={'right'}>
                <Text style={{ cursor:'pointer' }} onClick={disconnect}> {shortenAddress(solAccount.toBase58(),6)} </Text>
              </Tooltip>
              :
              <CustomizeButton  color={'primary'} onClick={() => updateModal(<WalletSelectionModal />)}>Connect to Phantom</CustomizeButton>
          }
        </Flex>
        <Checkbox  disabled checked={!!solAccount} />
      </Flex>
    </Stack>

  )
}
export default BindEthAndSolanaWallet