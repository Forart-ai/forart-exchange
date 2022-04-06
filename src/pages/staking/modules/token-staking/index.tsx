import React from 'react'
import { TOKEN_STAKING_POOLS } from '../../../../hooks/programs/useStaking/constants/tokens'
import TokenStakingCard from '../../components/TokenStaking/TokenStakingCard'

const TokenStakingModule: React.FC = () => {
  return (
    <>
      {TOKEN_STAKING_POOLS.map((pool, index) => (
        <TokenStakingCard {...pool} key={index} />
      ))}
    </>
  )
}

export default TokenStakingModule
