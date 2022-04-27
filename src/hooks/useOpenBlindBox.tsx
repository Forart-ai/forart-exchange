import { useCallback, useEffect, useState } from 'react'
import React from 'react'
import useCandyMachine from './programs/useCandyMachine'
import { mint as mintFromCandyMachine } from './programs/useCandyMachine/helpers/mint'
import useSettle from './programs/useSettle'
import { Keypair, PublicKey } from '@solana/web3.js'
import { HypeteenCandyMachineAddress } from './programs/useCandyMachine/helpers/constant'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import useAnchorProvider from './useAnchorProvider'
import { loadMetadata, MetadataResult } from '../utils/metaplex/metadata'
import CONFT_API from '../apis/co-nft'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import {  styled } from '@mui/material'
import { useModal } from '../contexts/modal'
import { SyncLoader } from 'react-spinners'
import CustomizeButton from '../contexts/theme/components/Button'
import { Link, useHistory } from 'react-router-dom'

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

const ImageContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  
  img {
    width: 80%;
    border-radius: 20px;
    margin: 20px 0;
  }
  
  .button {
    display: flex;
    justify-content: space-around;
  }
  
  .nft-name {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.primary.main};
   margin-bottom: 25px;
    font-family: KronaOne-Regular;
  }
`

const MODAL_CONTENT = {

  ready: (
    <Message>
      <div className={'row'}>
        Transaction ongoing, it may take few seconds...
      </div>
      <SyncLoader size={14} color={'#ffffff'} />
    </Message>
  ),

  mintFinished: (
    <Message>
      <div className={'row'}>
        Mint successfully, DePainter ticket airdrop is ongoing, please click approve in your wallet
      </div>
      <SyncLoader size={14} color={'#ffffff'} />
    </Message>
  ),

  tokenGiven: (
    <Message>
      <div className={'row'}>Success!</div>
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

const MetaDataContainer:React.FC<{metadata: MetadataResult}> = ({ metadata }) => {
  const history = useHistory()
  const {  closeModal } = useModal()

  const toNftDetail = (mint?:string) => {
    history.push(`/nft-detail?mint=${mint}`)
    closeModal()
  }

  return (
    <Dialog title={'New Hypeteen NFT'} closeable>
      <ImageContainer>
        <img src={metadata?.data?.image} />
        <div className={'nft-name'}> {metadata.data?.name}</div>

        <div className={'button'}>
          <CustomizeButton onClick={() => toNftDetail(metadata.mint.toBase58())} variant={'contained'}>View Hypeteen Detail</CustomizeButton>
          <a href={`https://solscan.io/token/${metadata?.mint.toBase58()}`} target={'_blank'} rel="noreferrer">
            <CustomizeButton color={'secondary'} variant={'contained'}>View on Solscan</CustomizeButton>
          </a>
        </div>
      </ImageContainer>
    </Dialog>
  )
}

const useOpenBlindBox = () => {
  const { builtMintTransaction, program } = useCandyMachine()
  const { buildSettleTransaction } = useSettle()
  const { adapter,account } = useSolanaWeb3()
  const { provider } = useAnchorProvider()
  const { connection } = useConnectionConfig()
  const { openModal } = useModal()

  const openBlindBox = useCallback(
    async () => {
      if (!adapter||!account) return

      openModal(<MessageBox content={MODAL_CONTENT.ready} />)

      const mint = Keypair.generate()

      const mintSignatureOrError = await mintFromCandyMachine(program, mint, HypeteenCandyMachineAddress)
        .catch(err => new Error(err.toString()))

      if (typeof mintSignatureOrError === 'string') {
        openModal(<MessageBox content={MODAL_CONTENT.mintFinished} />)
        await connection.confirmTransaction(mintSignatureOrError)
      } else {
        return openModal(<MessageBox closable={true} content={mintSignatureOrError.toString()} />)
      }

      const metaData:MetadataResult | undefined = await loadMetadata(connection, mint.publicKey)

      if (!metaData?.data) {
        return openModal(<MessageBox closable={true} content={' NFT metadata not found'} />)
      }

      await CONFT_API.core.nft.nftMint({
        series: '3312',
        nft: metaData.data.name,
        mintKey: mint.publicKey.toBase58(),
        wallet: account.toBase58()
      }).then(res => {
        console.log(res, 'alert success')
      })

      console.log(metaData)

      const { transaction: settleTransaction, signers: settleSigners } = await buildSettleTransaction(mint.publicKey)

      await provider.send(settleTransaction, settleSigners)
        .then(() => {
          openModal(<MetaDataContainer metadata={metaData} />)
        })
        .catch(err => {
          console.error(err)
          openModal(<MessageBox closable={true} content={err.toString()} />)
        })

    },[program, provider, adapter, buildSettleTransaction, builtMintTransaction ]
  )

  return { openBlindBox }
}

export default useOpenBlindBox
