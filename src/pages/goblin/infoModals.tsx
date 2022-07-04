import React from 'react'
import Dialog, { DialogVariantProps } from '../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'

const Wrapper = styled('div')`
  max-width: 90vw;
  width: 500px;
  color: #e3e3e3;
  font-family: Kanit-Regular;
  font-size: 18px;
`

export const MintStatusModal:React.FC<{msg: string, variant?:DialogVariantProps }> = ({ msg, variant }) => {
  return (
    <Dialog title={'Message'} variant={variant} closeable={true}>
      <Wrapper>
        <div>{msg}</div>
      </Wrapper>
    </Dialog>
  )
}

