import { styled } from '@mui/system'

export const InfoContainer = styled('div')(({ theme })=> ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, max-content)',
  gap: '14px 13%',
  justifyContent: 'center',
  marginBottom: '32px',
  justifyItems: 'center'
}))
