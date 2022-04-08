import React from 'react'
import { UseQueryResult } from 'react-query'
import BigNumber from 'bignumber.js'
import { styled } from '@mui/system'
import { Box, Button, Typography } from '@mui/material'
import {  SyncLoader } from 'react-spinners'
import { WalletRequiredArea } from '../../../../components/wallet-required-area'
import { useModal } from '../../../../contexts/modal'

export type StakingPoolHeadProps = {
    name: string
    icon: string

    availableRewards?: UseQueryResult<BigNumber | undefined>
    rewardTokenName?: string
    onHarvest?: () => void
}

const TokenStakingHeadContainer = styled('div')(({ theme }) =>({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const PoolIcon = styled('img')`
  width: 50px;
  margin-right: 20px;
`
const PoolName = styled('div')(({ theme }) =>({
  color: theme.palette.primary.contrastText,
  fontSize: 24,
  fontWeight: 'bolder',
  letterSpacing: 2
}))

const RewardArea = styled('div')(({ theme }) => ({
  display: 'flex',
  height:'100%',
  alignItems:'center',
  padding: '10px 20px',
  borderRadius: theme.spacing(1),
  background: theme.palette.primary.main,
}))

const RewardText = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
}))

const TokenStakingHead:React.FC<StakingPoolHeadProps> = ({ name, icon, availableRewards, rewardTokenName, onHarvest }) => {
  return (
    <TokenStakingHeadContainer sx={{ flexDirection:{ xs:'column', lg:'row' } }}>
      <Box sx={{ display:'flex', alignItems:'center', width:{ xs:'100%', lg:'fit-content' } }}>
        <PoolIcon src={icon} />
        <PoolName>{name}</PoolName>
      </Box>
      <RewardArea>
        <Box sx={{ display: 'flex' }}>
          <RewardText>Available rewards:  &nbsp;</RewardText>
          <RewardText>
            {
              availableRewards?.data ? (
                `${availableRewards.data.toFixed(6)} ${rewardTokenName}`
              ) :
                availableRewards?.isFetching ? (
                  <SyncLoader color={'white'} size={6} />
                ):
                  (
                    <>-  &nbsp;</>
                  )
            }
          </RewardText>
        </Box>
        <WalletRequiredArea>
          <Button
            sx={{ textTransform:'none', }}
            color={'secondary'}
            variant={'contained'}

          >
            Harvest
          </Button>
        </WalletRequiredArea>
      </RewardArea>
    </TokenStakingHeadContainer>
  )
}

export default TokenStakingHead
