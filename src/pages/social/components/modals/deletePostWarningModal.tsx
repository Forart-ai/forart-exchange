import React from 'react'
import Dialog from '../../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'
import Text from '../../../../contexts/theme/components/Text/Text'
import { useModal } from '../../../../contexts/modal'
import { SOCIAL_API } from '../../../../apis/auth'
import { useEnqueueSnackbar } from '../../../../contexts/theme/components/Snackbar'
import { useRefreshController } from '../../../../contexts/refresh-controller'

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
`

const DeletePostWarningModal:React.FC<{postId: string}> = ({ postId }) => {
  const { closeModal } = useModal()
  const enqueueSnackbar = useEnqueueSnackbar()
  const { forceRefresh } = useRefreshController()

  const handleDeletePost = () => {
    SOCIAL_API.deletePost(postId).then(() => {
      enqueueSnackbar('Delete post successfully', 'Success',{ variant: 'success' })
      closeModal()
      forceRefresh()
    }).catch(err => {
      enqueueSnackbar('Something is wrong', 'Oops!',{ variant: 'error' })
      closeModal()
    })
  }
  return (
    <Dialog
      variant={'warning'}
      closeable
      onCancel={ ()=>{closeModal()} }
      cancelButtonProps={{ children: 'No' }}
      onConfirm={handleDeletePost}
      confirmButtonProps={{ children: 'Yes' }}
    >
      <Wrapper>
        <Text color={'warning.main'} fontSize={22} textAlign={'center'}>Alert!</Text>
        <Text color={'#999999'} fontSize={18} textAlign={'center'} >Sure to delete this post?</Text>

      </Wrapper>
    </Dialog>
  )
}

export default DeletePostWarningModal
