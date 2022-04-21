import React from 'react'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/material'

const Text = styled('div')`
  font-family: Arial;
  color: ${({ theme }) => theme.palette.secondary.light};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  height: fit-content;
`
const MintMessageDialog:React.FC<{message:string}> = ({ message }) => {
  return (
    <Dialog title={'Oops, something is wrong'} closeable={true}>
      <Text>{message}</Text>
    </Dialog>
  )
}

export default MintMessageDialog
