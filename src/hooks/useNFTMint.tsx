import React, { useCallback, useEffect, useState } from 'react'
import { useModal } from '../contexts/modal'
import { useSolanaWeb3 } from '../contexts/solana-web3'
import styled from 'styled-components'
import CONFT_API from '../apis/co-nft'
import { useHistory } from 'react-router-dom'
import { NFTAttributesData } from '../types/coNFT'
import { Box } from '@mui/material'
import { Keypair, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js'
import useCandyMachine from './programs/useCandyMachine'
import Dialog from '../contexts/theme/components/Dialog/Dialog'
import { useConnectionConfig } from '../contexts/solana-connection-config'
import BigNumber from 'bignumber.js'
import { PainterCandyMachineAddress } from './programs/useCandyMachine/helpers/constant'
import useAnchorProvider from './useAnchorProvider'
import { Minting } from './useStorageCheck'
import CustomizeButton from '../contexts/theme/components/Button'

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

const MintSuccessDialog = () => {
  const { closeModal } = useModal()
  const history = useHistory()

  return (
    <Dialog title={'Congratulations!'} closeable>
      <Message>Mint successfully</Message>
      <Box sx={{ width:'100%', display:'flex', justifyContent:'center', marginTop:'30px' }}>
        <CustomizeButton sx={{ margin:'10px' }} variant={'contained'} onClick={() => closeModal()}> Mint Again</CustomizeButton>
        <CustomizeButton
          sx={{ margin:'10px' }}
          variant={'contained'}
          color={'secondary'}
          onClick={() => {
            history.push('/account')
            closeModal()
          }}
        > Personal space
        </CustomizeButton>
      </Box>
    </Dialog>
  )
}

function serialExecute(tasks: Array<Promise<any>>): Promise<any> {
  return tasks.reduce(
    (previousPromise, currentPromise) => previousPromise.then(resultList => {
      return new Promise(resolve => {
        currentPromise.then(result => {
          console.log(result)
          resolve(resultList.concat(result))
        }).catch(() => {
          resolve(resultList.concat(null))
        })
      })
    }),
    Promise.resolve([])
  )
}

const useNFTMint = () => {
  const { account, adapter } = useSolanaWeb3()
  const { provider } = useAnchorProvider()
  const { builtMintTransaction } = useCandyMachine()
  const { openModal } = useModal()

  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [remainTime, setRemainTime] = useState<number>()

  const { connection } = useConnectionConfig()

  const [rawTransactions, setRawTransactions] = useState<Transaction[]>()
  const [intervalId, setIntervalId] = useState<any>()
  const [createResult, setCreateResult] = useState<ExtractPromise<ReturnType<typeof CONFT_API.core.nft.nftCreate>>>()
  const [createdMint, setCreatedMint] = useState<Keypair>()

  useEffect(() => {
    if (!rawTransactions || !intervalId || !createResult || !account || remainTime === undefined) return

    if (remainTime <= 0) {
      setMessage('No time left. The transaction will not be sent')
      setLoading(false)
      return
    }

    serialExecute(rawTransactions.map(raw => connection.sendRawTransaction(raw.serialize())))
      .then(() => {
        clearInterval(intervalId)
        setIntervalId(undefined)
        return CONFT_API.core.nft.nftMint({ nft: createResult.nft, wallet: account.toBase58(), mintKey: createResult.mintKey })
      })
      .then(() => openModal(<MintSuccessDialog />))
      .catch(e => {
        console.error(e)
        setLoading(false)
        setMessage(e.toString())
        setRawTransactions(undefined)
      })
  }, [rawTransactions, remainTime, intervalId, createResult, account])

  const mintNFT = useCallback(
    async (body: NFTAttributesData, kit: NFTAttributesData[], minting?: Minting) => {
      setMessage('')
      setLoading(true)

      /* pre-check */
      if (!account || !adapter) {
        setLoading(false)
        throw new Error(' Wallet unconnected ')
      }

      const components = kit.filter(o => !!o).map(o => o.id).concat(body.id)
      if (components.length !== 8) {
        throw new Error(' Must choose all attributes ')
      }

      const solBalance = new BigNumber(await connection.getBalance(account))

      if (solBalance.lt(TRANSACTION_FEE.plus(ACCOUNT_FEE))) {
        setMessage(`Insufficient SOL balance, the network fee cost ${TRANSACTION_FEE.plus(ACCOUNT_FEE).shiftedBy(-9).toString()} Sol`,)
        setLoading(false)
        return
      }
      /* pre-check */

      /* re-enter check */
      if (minting) {
        if (!intervalId) setRemainTime(minting.mintRemainTime)

        setCreateResult({
          ...minting,
          nft: minting.id,
          remain: minting.mintRemainTime
        })
      }
      /* re-enter check */

      const mintKeypair = minting
        ? Keypair.fromSecretKey(new Buffer(minting.mintPrivateKey, 'base64'))
        : (
          createdMint || Keypair.generate()
        )

      const transactions = await builtMintTransaction(mintKeypair, PainterCandyMachineAddress)

      try {
        // is NOT re-enter
        if (!createResult && !minting) {
          const createResult = await CONFT_API.core.nft.nftCreate({
            series: 1024,
            components,
            wallet: account.toBase58(),
            mintKey: mintKeypair.publicKey.toBase58(),
            mintPrivateKey: Buffer.from(mintKeypair.secretKey).toString('base64')
          })

          setCreatedMint(mintKeypair)
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

        setRawTransactions(
          await adapter.signAllTransactions(transactions)
        )
      } catch (e: any) {
        setLoading(false)
        setMessage(`Failed to mint: ${e.toString()}`)
      }
    }, [adapter, intervalId, account, connection, provider, createResult, createdMint]
  )

  return { mintNFT, loading, message, remainTime }
}

export default useNFTMint
