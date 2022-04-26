import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import useCandyMachine from './programs/useCandyMachine'
import { mint as mintFromCandyMachine } from './programs/useCandyMachine/helpers/mint'
import useSettle from './programs/useSettle'
import { Keypair } from '@solana/web3.js'
import { HypeteenCandyMachineAddress } from './programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import useAnchorProvider from './useAnchorProvider'
import { loadMetadata, MetadataResult } from '../utils/metaplex/metadata'
import CONFT_API from '../apis/co-nft'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/material'
import { useModal } from '../contexts/modal'
import { SyncLoader } from 'react-spinners'
import CustomizeButton from '../contexts/theme/components/Button'

const BoxContainer = styled('div')`
  min-height: 100px;
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  font-family: Arial;

`

const Message = styled('div')`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  
  .row {
    margin-bottom: 20px;
  }
 

  strong {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 24px;
  }
`

const MODAL_CONTENT = {

  ready: (
    <Message>
      <div className={'row'}>
        There will be <strong>TWO</strong> transactions in total,
      </div>
      <div>Each HypeTeen mint needs 1 SOL and will be airdropped 1 WL of Painter NFT</div>
      <SyncLoader size={14} color={'#ffffff'} />
    </Message>
  ),

  mintFinished: (
    <Message>Requesting the wallet transaction, it&apos;ll take secs..</Message>
  ),

  tokenGiven: (
    <Message>
      <div className={'row'}>WL airdrop is ongoing, please click  Approve </div>
      <div>The dialog will automatically close after 3 seconds</div>
    </Message>
  ),
}

const MessageBox:React.FC<{ content : typeof MODAL_CONTENT[keyof typeof MODAL_CONTENT] | string, closable?:boolean, onNext?:(_?:any) => void}> = ({ content,closable, onNext }) => {
  return (
    <Dialog title={'Hypeteen Minting'} closeable={closable}>
      <BoxContainer>{content}</BoxContainer>
      {/*<CustomizeButton onClick={() => onNext && onNext(true) }>Continue</CustomizeButton>*/}
    </Dialog>
  )
}

const useOpenBlindBox = () => {
  const { builtMintTransaction, program } = useCandyMachine()
  const { buildSettleTransaction } = useSettle()
  const { adapter,account } = useSolanaWeb3()
  const { provider } = useAnchorProvider()
  const { connection } = useConnectionConfig()
  const { openModal, closeModal } = useModal()
  const [nextStep, setNextStep] = useState<boolean>(false)

  useEffect(() => {
    console.log(nextStep)
  },[nextStep])

  const openBlindBox = useCallback(
    async () => {
      if (!adapter||!account) return

      openModal(<MessageBox content={MODAL_CONTENT.ready} />)

      const mint = Keypair.generate()
      await mintFromCandyMachine(program, mint, HypeteenCandyMachineAddress)
        .then(() =>  openModal(<MessageBox content={MODAL_CONTENT.mintFinished} />))
        .catch(err => openModal(<MessageBox closable={true} content={err.toString()} />))

      const metaData:MetadataResult | undefined  = await loadMetadata(connection, mint.publicKey)

      if (!metaData?.data) {
        console.log('no metadata')
        return
      }

      await CONFT_API.core.nft.nftMint({
        series: '3312',
        nft: metaData.data.name,
        mintKey: mint.publicKey.toBase58(),
        wallet: account.toBase58()
      }).then(res => {
        console.log(res, 'alert success')
      })

      const { transaction: settleTransaction, signers: settleSigners } = await buildSettleTransaction(mint.publicKey)

      await provider.send(settleTransaction, settleSigners)
        .then(() => {
          openModal(<MessageBox content={MODAL_CONTENT.tokenGiven} />)
          setTimeout(closeModal, 3000)
        })
        .catch(err => openModal(<MessageBox closable={true} content={err.toString()} />))

    },[program, provider, adapter, buildSettleTransaction, builtMintTransaction, nextStep, setNextStep]
  )

  return { openBlindBox }
}

export default useOpenBlindBox
