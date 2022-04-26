import useAnchorProvider from '../../useAnchorProvider'
import React, { useCallback, useMemo } from 'react'
import { BN, Program } from '@project-serum/anchor'
import { DONATE_PROGRAM_ID, DonationIDL, POOL_ADDRESS, USDC_TOKEN_ADDRESS, USDC_TOKEN_DECIMALS } from './constants'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import { LAMPORTS_PER_SOL, ParsedAccountData, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useQuery } from 'react-query'
import BigNumber from 'bignumber.js'
import CONFT_API from '../../../apis/co-nft'
import { useConnectionConfig } from '../../../contexts/solana-connection-config'

const DONOR_ACCOUNT_FEE = new BigNumber('0.00145').multipliedBy(LAMPORTS_PER_SOL)
const TRANSACTION_FEE = new BigNumber('5000' )

const useDonation = () => {
  const { provider } = useAnchorProvider()
  const { connection } = useConnectionConfig()
  const { account } = useSolanaWeb3()

  const program = useMemo(() => {
    if (!provider) {
      return undefined
    }

    return new Program(DonationIDL, DONATE_PROGRAM_ID, provider)
  }, [provider])

  const donate = useCallback(async (args: { donateAmount: string }) => {
    if (!program || !account ) {
      return
    }

    const { donateAmount } = args

    const [donor, bump] = await PublicKey.findProgramAddress(
      [Buffer.from('donor'), POOL_ADDRESS.toBuffer(), account.toBuffer()],
      program.programId
    )

    const userATA = (await program.provider.connection.getTokenAccountsByOwner(account,{ mint: USDC_TOKEN_ADDRESS })).value[0]?.pubkey

    if (!userATA) {
      throw new Error('insufficient USDC balance')
    }

    const tokenAccount = await connection.getParsedAccountInfo(userATA)

    const usdcBalance = (tokenAccount.value?.data as ParsedAccountData).parsed.info.tokenAmount.uiAmountString

    if (new BigNumber(usdcBalance).lt(new BigNumber(donateAmount))) {
      throw new Error('insufficient USDC balance')
    }

    const solBalance = new BigNumber(await connection.getBalance(account))

    if (solBalance.lt(TRANSACTION_FEE)) {
      throw new Error('insufficient SOL balance')
    }

    const poolInfo = await program.account.pool.fetch(POOL_ADDRESS)

    const donorInfo = await program.account.donor.fetchNullable(donor)

    let userDonated = '0'

    if (donorInfo) {
      userDonated = new BigNumber(donorInfo.amount.toString()).shiftedBy(-USDC_TOKEN_DECIMALS).toString()
    }

    const tx = new Transaction()

    if (donorInfo == null) {
      if (solBalance.lt(TRANSACTION_FEE.plus(DONOR_ACCOUNT_FEE))) {
        throw new Error('insufficient SOL balance')
      }

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
        tokenMint: USDC_TOKEN_ADDRESS,
        user: account,
        donateAccount: userATA,
        poolAccount: poolInfo.poolAccount,
        feeAccount: poolInfo.feeAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    }))

    await program.provider.send(tx)

    await CONFT_API.core.user.userSeriesVote(3312, account.toBase58(), +userDonated + +donateAmount)
  }, [program, connection])

  const poolDonated = useQuery(['POOL_DONATED', program?.programId], async () => {
    if (!program ) return

    const poolInfo = await program.account.pool.fetchNullable(POOL_ADDRESS)

    if (!poolInfo) {
      return new BigNumber(0)
    }

    const totalDonateAmount = new BigNumber(poolInfo.totalDonateAmount.toString())
    const totalFeeAmount = new BigNumber(poolInfo.totalFeeAmount.toString())

    const total = totalDonateAmount.plus(totalFeeAmount)

    return total.shiftedBy(-USDC_TOKEN_DECIMALS)
  })

  const userAta = useQuery(['USER_ATA',program?.programId, account], async () => {
    if (!program || !account) return

    return await program.provider.connection.getTokenAccountsByOwner(account, { mint: USDC_TOKEN_ADDRESS })
      .then(account => account.value[0]?.pubkey).catch(() => undefined)
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
    poolDonated,
    userAta
  }
}

export { useDonation }
