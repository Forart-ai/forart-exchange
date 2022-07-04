import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo, useState } from 'react'
import { AnchorProvider, Program } from '@project-serum/anchor'
import { FreeMint, FreeMintIDL } from './constant/idl'
import { FREE_MINT_POOL_ADDRESS, FREE_MINT_PROGRAM_ID, FREE_MINT_TOKEN_ADDRESS } from './constant'
import { Keypair, PublicKey, Signer, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction } from '@solana/web3.js'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
// @ts-ignore
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useQuery } from 'react-query'
import { BigNumber } from 'ethers'
import { MessageType } from '../../ai-generarl/useGoblinMint'
import { useRefreshController } from '../../../contexts/refresh-controller'

const useFreeMint = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<MessageType>({ color: '', msg: '' })
  const { forceRefresh } = useRefreshController()

  const program = useMemo(() => {
    return new Program<FreeMint>(FreeMintIDL, FREE_MINT_PROGRAM_ID, provider)
  },[provider])

  const getFreeMintToken = useCallback(
    async () => {

      if (!account) return
      setLoading(true)
      setMessage({ msg:'Building transactions...', color:'white' })

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

      setMessage({ msg:'Please confirm the transaction', color:'white' } )

      // const tx: { tx: Transaction; signers?: Signer[] }[] = []

      // tx.push({
      //   tx:
      // })

      // tx.push({
      //   tx: new Transaction().add(instruction2)
      // })

      const signatures = await (program.provider as AnchorProvider).sendAndConfirm(
        new Transaction().add(instruction, instruction)
      )
        .then(() => {
          setMessage({ msg:'Whitelist token has given, you can mint your Goblin now', color:'#50dcb5' })
          forceRefresh()
          setLoading(false)

        }).catch(er => {
          setMessage({ msg:er.toString(), color:'#fb9526' })
          setLoading(false)
        })

      return signatures

    },
    [provider],
  )

  const userRemainTokenCount = useQuery(['USER_REMAIN_TOKEN_COUNT', program.programId, account, forceRefresh], async () => {
    if (!program || !account) return
    const poolAccount = await program.account.pool.fetch(FREE_MINT_POOL_ADDRESS)

    const [pocket] = await PublicKey.findProgramAddress(
      [Buffer.from('pocket'), FREE_MINT_POOL_ADDRESS.toBuffer(), account.toBuffer()],
      program.programId
    )

    const pocketAccount = await program.account.pocket.fetchNullable(pocket)
    let remainTokenCount = pocketAccount == null ? poolAccount.ticketPerKey : poolAccount.ticketPerKey.sub(pocketAccount.ticketCount).toNumber()

    // console.log('poolAccount.claimedTicketCount', poolAccount.claimedTicketCount.toString())
    // console.log('poolAccount.ticketPerKey', poolAccount.ticketPerKey.toString())
    // console.log('pocketAccount.ticketCount', pocketAccount?.ticketCount.toString())
    // console.log('poolAccount.totalTicketCount', poolAccount.totalTicketCount.toString())
    //
    // console.log('pocketAccount',pocketAccount?.ticketCount)
    // console.log(remainTokenCount)

    remainTokenCount =
      remainTokenCount < poolAccount.totalTicketCount.sub(poolAccount.claimedTicketCount).toNumber() ?
        remainTokenCount : poolAccount.totalTicketCount.sub(poolAccount.claimedTicketCount).toNumber()

    return remainTokenCount

  })

  return { getFreeMintToken, userRemainTokenCount, loading, message }

}

export { useFreeMint }
