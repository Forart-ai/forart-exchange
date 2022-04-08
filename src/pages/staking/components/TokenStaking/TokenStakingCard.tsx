import React from 'react'
import { TokenStakingPoolConfig } from '../../../../hooks/programs/useStaking/constants/tokens'
import { TokenStakingCardWrapper } from './index.styles'
import TokenStakingHead from './TokenStakingHead'

const TokenStakingCard:React.FC<TokenStakingPoolConfig> = props => {
  console.log(props)
  const { currency, rewardTokenName } = props

  const poolName = currency[0].name

  return (
    <TokenStakingCardWrapper>
      <TokenStakingHead name={poolName} icon={currency[0].icon} />
    </TokenStakingCardWrapper>
  )
}

export default TokenStakingCard
