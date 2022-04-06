import { styled } from '@mui/system'

export const TokenStakingCardWrapper = styled('div')(props => {
  const { theme } = props
  return ({
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1)
  })
})
