import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSolanaWeb3 } from '../../../../contexts/solana-web3'
import { useModal } from '../../../../contexts/modal'
import WalletSelectionModal from '../../../../components/wallet/WalletSelectionModal'
import useUserQuery from '../../../../hooks/queries/useUserQuery'
import { useCheckWhiteListModal } from '../../../../hooks/modals/useCheckWhiteListModal'
import useDiscordAccessToken from '../../../../hooks/useDiscordAccessToken'

import {
  MintWrapper,
} from '../../artistMint.style'

import { useWhiteList } from '../../../../hooks/programs/useWhiteList'
import HypeteenCreate from './hypeteen/hypeteenCreate'
import IdentifyCreate from './identifyNFT/identifyCreate'

const NftCreate: React.FC = () => {

  const { account } = useSolanaWeb3()

  const { openModal } = useModal()

  const openWallet = useCallback(() => {
    openModal(<WalletSelectionModal />)
  },[])

  //bind discord
  //
  // const { checkWhiteListModal, openCheckWhiteListModal } = useCheckWhiteListModal()
  // const discordAccessToken = useDiscordAccessToken()
  // useEffect(() => {
  //   if (discordAccessToken) {
  //     openCheckWhiteListModal()
  //   }
  //   else return
  // },[discordAccessToken])

  return (
    <MintWrapper >
      {/*<HypeteenCreate />*/}
      <IdentifyCreate />
    </MintWrapper>
  )
}

export default NftCreate
