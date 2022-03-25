import useAnchorProvider from '../../useAnchorProvider'
import { useCallback, useMemo } from 'react'
import { BN, Program } from '@project-serum/anchor'
import { DONATE_PROGRAM_ID, POOL_ADDRESS, USDC_TOKEN_ADDRESS, USDC_TOKEN_DECIMALS, DonationIDL } from './constants'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useQuery } from 'react-query'
import BigNumber from 'bignumber.js'
import { useModal } from '../../../contexts/modal'
import DonationSuccess from '../../../components/modals/donation/donation-success'
import React from 'react'

const useDonation = () => {
  const provider = useAnchorProvider()
  const { account } = useSolanaWeb3()
  const { openModal } = useModal()

  const program = useMemo(() => {
    if (!provider) {
      return undefined
    }

    return new Program(DonationIDL, DONATE_PROGRAM_ID, provider)
  }, [provider])

  const donate = useCallback(async (args: { donateAmount: string }) => {
    if (!program || !account) {
      return
    }

    const { donateAmount } = args

    const [donor, bump] = await PublicKey.findProgramAddress(
      [Buffer.from('donor'), POOL_ADDRESS.toBuffer(), account.toBuffer()],
      program.programId
    )

    const userATA = (await program.provider.connection.getTokenAccountsByOwner(account,{ mint: USDC_TOKEN_ADDRESS })).value[0].pubkey

    const poolInfo = await program.account.pool.fetch(POOL_ADDRESS)

    const donorInfo = await program.account.donor.fetchNullable(donor)

    const tx = new Transaction()

    if (donorInfo == null) {
      tx.add(program.instruction.register(bump, {
        accounts: {
          pool: POOL_ADDRESS,
          donor,
          user: account,
          payer: account,
          systemProgram: SystemProgram.programId,
        },
      }))
    }

    tx.add(program.instruction.donate(new BN(new BigNumber(donateAmount).shiftedBy(USDC_TOKEN_DECIMALS).toString()), {
      accounts: {
        pool: POOL_ADDRESS,
        donor,
        user: account,
        donateAccount: userATA,
        poolAccount: poolInfo.poolAccount,
        feeAccount: poolInfo.feeAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    }))

    await program.provider.send(tx)
    openModal(<DonationSuccess />)

  }, [program])

  const poolDonated = useQuery(['POOL_DONATED', program?.programId], async () => {
    if (!program ) return

    const poolInfo = await program.account.pool.fetch(POOL_ADDRESS)

    if (!poolInfo) {
      return new BigNumber(0)
    }

    console.log(new BigNumber(poolInfo.totalDonateAmount.toString()).shiftedBy(-USDC_TOKEN_DECIMALS))

    return new BigNumber(poolInfo.totalDonateAmount.toString()).shiftedBy(-USDC_TOKEN_DECIMALS)
  })

  const userDonated = useQuery(['USER_DONATED', program?.programId, account], async () => {
    if (!program || !account) return

    const [donor] = await PublicKey.findProgramAddress(
      [Buffer.from('donor'), POOL_ADDRESS.toBuffer(), account.toBuffer()],
      program.programId
    )

    const donorInfo = await program.account.donor.fetchNullable(donor)

    if (!donorInfo) {
      return new BigNumber(0)
    }

    return new BigNumber(donorInfo.amount.toString()).shiftedBy(-USDC_TOKEN_DECIMALS)
  })

  return {
    donate,
    userDonated,
    poolDonated
  }
}

export { useDonation }
