import { flexbox } from 'styled-system'
import { FlexProps } from './types'
import { Box, styled } from '@mui/material'

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export default Flex
