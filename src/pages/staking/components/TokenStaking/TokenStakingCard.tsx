import React from 'react'
import { TokenStakingPoolConfig } from '../../../../hooks/programs/useStaking/constants/tokens'
import { TokenStakingCardWrapper } from './index.styles'
import TokenStakingHead from './TokenStakingHead'
import { InfoContainer } from '../common.styles'
import { DataItem } from '../DataItems'
import { Box, Button } from '@mui/material'
import { WalletRequiredArea } from '../../../../components/wallet-required-area'

const TokenStakingCard:React.FC<TokenStakingPoolConfig> = props => {
  const { currency, rewardTokenName } = props

  const poolName = currency[0].name

  return (
    <TokenStakingCardWrapper>
      <TokenStakingHead name={poolName} icon={currency[0].icon} />
      <InfoContainer >
        <DataItem
          label={'Total Deposited: '}
        />

        <DataItem
          label={'APR: '}
        />

        <DataItem
          label={'Your Deposited: '}
        />

        <DataItem
          label={'Your History Harvest: '}
        />
      </InfoContainer>

      <Box sx={{ display:'flex', justifyContent:'center' }}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns:'repeat(2, 1fr)' }} >
          <WalletRequiredArea>
            <Button variant={'contained'}> Deposit </Button>
          </WalletRequiredArea>

          <WalletRequiredArea>
            <Button variant={'contained'}> Withdraw </Button>
          </WalletRequiredArea>
        </Box>
      </Box>
    </TokenStakingCardWrapper>
  )
}

export default TokenStakingCard
