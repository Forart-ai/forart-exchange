import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { Program } from '@project-serum/anchor'
import { FreeMint, FreeMintIDL } from './constant/idl'
import { FREE_MINT_POOL_ADDRESS, FREE_MINT_PROGRAM_ID, FREE_MINT_TOKEN_ADDRESS } from './constant'
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
// @ts-ignore
import { ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'

const useFreeMint = () => {
  const { provider } = useAnchorProvider()
  const { account } = useSolanaWeb3()

  const program = useMemo(() => {
    return new Program<FreeMint>(FreeMintIDL, FREE_MINT_PROGRAM_ID, provider)
  },[provider])

  const getFreeMintToken = useCallback(
    async () => {

      if (!account) return

      const [mintAuthority,] = await PublicKey.findProgramAddress(
        [Buffer.from('mint_authority'),FREE_MINT_TOKEN_ADDRESS.toBuffer()],
        program.programId
      )

      const [pocket,] = await PublicKey.findProgramAddress(
        [Buffer.from('pocket'), FREE_MINT_POOL_ADDRESS.toBuffer(), account.toBuffer()],
        program.programId
      )
      const token = await getAssociatedTokenAddress(FREE_MINT_TOKEN_ADDRESS, account)

      await program.rpc.request(  {
        accounts: {
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
        }
      })
    },
    [provider],
  )

  return { getFreeMintToken }

}

export { useFreeMint }
