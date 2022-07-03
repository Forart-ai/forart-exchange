import React from 'react'
import Dialog from '../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'

const Wrapper = styled('div')`
  max-width: 90vw;
  width: 500px;
  color: #e3e3e3;
  font-family: Kanit-Regular;
  font-size: 18px;
`

export const MintStatusModal:React.FC<{err: string}> = ({ err }) => {
  return (
    <Dialog title={'Something is going wrong'} variant={'warning'} closeable={true}>
      <Wrapper>
        <div>{err}</div>
      </Wrapper>
    </Dialog>
  )
}

