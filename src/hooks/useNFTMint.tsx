import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import { Progress } from 'antd'
import styled from 'styled-components'
import CONFT_API from '../apis/co-nft'
import { useHistory } from 'react-router-dom'
import { NFTAttributesData } from '../types/coNFT'
import { Alert } from '@mui/material'
import { Keypair, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import useCandyMachine from './programs/useCandyMachine'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { useRefreshController } from '../contexts/refresh-controller'
import { ClipLoader } from 'react-spinners'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import BigNumber from 'bignumber.js'
import { PainterCandyMachineAddress } from './programs/useCandyMachine/helpers/constant'
import useAnchorProvider from './useAnchorProvider'
import { Minting } from './useStorageCheck'

const TRANSACTION_FEE = new BigNumber('5000' )

const ACCOUNT_FEE = new BigNumber('0.01197').multipliedBy(LAMPORTS_PER_SOL)

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 24px;
  color: #ffffff;
  width: 400px;
  max-width: 98vw;
`

type ExtractPromise<A> = A extends Promise<infer T> ? T : never

const useNFTMint = () => {
  const { account, adapter } = useSolanaWeb3()
  const { provider } = useAnchorProvider()
  const { builtMintTransaction } = useCandyMachine()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [remainTime, setRemainTime] = useState<number>()

  const { connection } = useConnectionConfig()

  const [rawTransaction, setRawTransaction] = useState<Transaction>()
  const [intervalId, setIntervalId] = useState<any>()
  const [createResult, setCreateResult] = useState<ExtractPromise<ReturnType<typeof CONFT_API.core.nft.nftCreate>>>()

  useEffect(() => {
    if (!rawTransaction || !intervalId || !createResult || !account || remainTime === undefined) return

    if (remainTime <= 0) {
      setMessage('No time left. The transaction will not be sent')
      setLoading(false)
      return
    }

    clearInterval(intervalId)
    setIntervalId(undefined)
    connection.sendRawTransaction(rawTransaction.serialize())
      .then(() => {
        CONFT_API.core.nft.nftMint({ nft: createResult.nft, wallet: account.toBase58(), mintKey: createResult.mintKey })
      })
  }, [rawTransaction, remainTime, intervalId, createResult, account])

  const mintNFT = useCallback(
    async (body: NFTAttributesData, kit: NFTAttributesData[], mintKeypair: Keypair, minting?: Minting) => {
      setMessage('')
      setLoading(true)

      if (minting) {
        if (!intervalId) setRemainTime(minting.mintRemainTime)

        setCreateResult({
          ...minting,
          nft: minting.id,
          remain: minting.mintRemainTime
        })
      }

      const components: number[] = []

      kit.map(item => {
        if (item) {
          components.push(item?.id)
        }
      })

      if (!account) {
        setLoading(false)
        throw new Error(' Wallet unconnected ')
      }

      const a = components.concat(body.id)

      if (a.length !== 8) {
        throw new Error(' Must choose all attributes ')
      }

      const solBalance = new BigNumber(await connection.getBalance(account))

      if (solBalance.lt(TRANSACTION_FEE.plus(ACCOUNT_FEE))) {
        setMessage(`Insufficient SOL balance, the network fee cost ${TRANSACTION_FEE.plus(ACCOUNT_FEE).shiftedBy(-9).toString()} Sol`,)
        setLoading(false)
        return
      }

      const secretKey = mintKeypair.secretKey

      const { transaction, signers } = await builtMintTransaction(mintKeypair, PainterCandyMachineAddress)

      try {
        if (!createResult && !minting) {
          const createResult = await CONFT_API.core.nft.nftCreate({
            series: 1024,
            components: a,
            wallet:account.toBase58(),
            mintKey: mintKeypair.publicKey.toBase58(),
            mintPrivateKey: Buffer.from(secretKey).toString('base64')
          })

          setCreateResult(createResult)
          setRemainTime(createResult.remain)
        }

        if (!intervalId) {
          const id = setInterval(() => {
            setRemainTime(_prev => {
              const prev = _prev as number

              if (prev >= 1) return prev - 1

              clearInterval(id)
              return prev
            })
          }, 1000)

          setIntervalId(id)
        }

        transaction.sign(...signers)

        setRawTransaction(
          await adapter?.signTransaction(transaction)
        )
      } catch (e: any) {
        setLoading(false)
        setMessage(`Failed to mint: ${e.toString()}`)
      }

      //------------------------------------------------------

      // await CONFT_API.core.nft.nftCreate({ series: 1024, components: a, wallet:account.toBase58(), mintKey: mintKeypair.publicKey.toBase58(), mintPrivateKey: Buffer.from(secretKey).toString('base64') }).then((res:any) => {
      //   console.log(res)
      //   setMessage('✅ Please approve transfer transaction in your wallet')
      //   mint(mintKeypair)
      //     .then(async _signature => {
      //       console.log(mintKeypair.publicKey.toBase58(), _signature)
      //       setMessage(' Transaction sent successfully! Please wait for confirming')
      //       return connection.confirmTransaction(_signature)
      //     })
      //     .then(() => {
      //       setLoading(false)
      //       setMessage(' Transaction confirmed. The NFT has been mint ')
      //     })
      //     .then(() => {
      //       CONFT_API.core.nft.nftMint({ nft: res.nft, wallet: account.toBase58(), mintKey: mintKeypair.publicKey.toBase58() })
      //         .then(() =>sleep(1500))
      //         .then(()=>forceRefresh)
      //         .then(() =>   {
      //           openModal(
      //             <Dialog title={'Congratulations!'} closeable  >
      //               <Message>Mint successfully</Message>
      //               <Box sx={{ width:'100%', display:'flex', justifyContent:'center', marginTop:'30px' }}>
      //                 <CustomizeButton variant={'contained'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
      //                 <CustomizeButton variant={'contained'}
      //                   color={'secondary'}
      //                   onClick={() => {
      //                     history.push('/account')
      //                     closeModal()
      //                   }}
      //                 > Personal space
      //                 </CustomizeButton>
      //               </Box>
      //             </Dialog>
      //           )
      //         })
      //     })
      //     .catch(err => {
      //
      //       openModal(
      //         // <Dialog title={'Oops, Something is wrong'} closeable>
      //         //   <Message>Mint Failed: {err.message || err.toString()}</Message>
      //         // </Dialog>
      //         <Dialog title={'Congratulations!'} closeable  >
      //           <Message>Mint successfully</Message>
      //           <CustomizeButton variant={'contained'} color={'secondary'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
      //           <CustomizeButton variant={'contained'} onClick={() => history.push('/account')}> Personal space</CustomizeButton>
      //         </Dialog>
      //       )
      //       setLoading(false)
      //
      //     })
      // })
      //   .catch(er => {
      //     openModal(
      //       <Dialog title={'Oops, Something is wrong'} closeable>
      //         <Message>Mint Failed: {er.message || er.toString()}</Message>
      //       </Dialog>
      //     )
      //   })

    }, [intervalId, account, connection, provider, createResult]
  )

  return { mintNFT, loading, message, remainTime }
}

export default useNFTMint
