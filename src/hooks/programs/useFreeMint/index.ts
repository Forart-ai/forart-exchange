import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { BN, Program } from '@project-serum/anchor'
import { FreeMint, FreeMintIDL } from './constant/idl'
import { FREE_MINT_POOL_ADDRESS, FREE_MINT_PROGRAM_ID, FREE_MINT_TOKEN_ADDRESS } from './constant'
import { PublicKey, Signer, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
// @ts-ignore
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useQuery } from 'react-query'
import { useRefreshController } from '../../../contexts/refresh-controller'
import _ from 'lodash'
import { useConnectionConfig } from '../../../contexts/solana-connection-config'

const useFreeMint = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { slowRefreshFlag } = useRefreshController()

  const program = useMemo(() => {
    return new Program<FreeMint>(FreeMintIDL, FREE_MINT_PROGRAM_ID, provider)
  }, [provider])

  const userRemainTokenCount = useQuery(
    ['USER_REMAIN_TOKEN_COUNT', program.programId, account, slowRefreshFlag],
    async () => {
      if (!account) return

      const poolAccount = await program.account.pool.fetch(FREE_MINT_POOL_ADDRESS)

      const [pocket] = await PublicKey.findProgramAddress(
        [Buffer.from('pocket'), FREE_MINT_POOL_ADDRESS.toBuffer(), account.toBuffer()],
        program.programId
      )

      const pocketAccount = await program.account.pocket.fetchNullable(pocket)

      const max = poolAccount.ticketPerKey

      const claimed = (pocketAccount?.ticketCount) ?? new BN(0)

      return max.sub(claimed).toNumber()
    })

  const startTime = useQuery(['GOBLIN_START_TIME', program.programId, account],
    async () => {
      if (!account) return
      const poolAccount = await program.account.pool.fetch(FREE_MINT_POOL_ADDRESS)
      const time = poolAccount.startTime

      return parseInt(time.toString())
    })

  const buildRequestTransaction = useCallback(
    async (amount: number): Promise<{ tx: Transaction, signers: Signer[] }> => {
      if (!account || userRemainTokenCount.data === undefined) {
        throw new Error('Env not ready')
      }

      if (!amount || amount < 0) {
        throw new Error('Amount to request must gather than 0')
      }

      if (amount > userRemainTokenCount.data) {
        throw new Error(`Can only request ${userRemainTokenCount} whitelist token but requesting ${amount}`)
      }

      const [mintAuthority,] = await PublicKey.findProgramAddress(
        [Buffer.from('mint_authority'), FREE_MINT_TOKEN_ADDRESS.toBuffer()],
        program.programId
      )

      const [pocket,] = await PublicKey.findProgramAddress(
        [Buffer.from('pocket'), FREE_MINT_POOL_ADDRESS.toBuffer(), account.toBuffer()],
        program.programId
      )

      const token = await getAssociatedTokenAddress(FREE_MINT_TOKEN_ADDRESS, account)

      const instruction = await program.methods
        .request()
        .accounts({
          pool: FREE_MINT_POOL_ADDRESS,
          mint: FREE_MINT_TOKEN_ADDRESS,
          mintAuthority,
          pocket,
          token,
          user: account,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .instruction()

      return {
        tx: new Transaction().add(..._.fill(_.range(amount), instruction)),
        signers: []
      }
    },
    [account, program, userRemainTokenCount],
  )

  return { buildRequestTransaction, userRemainTokenCount, startTime }
}

export { useFreeMint }
