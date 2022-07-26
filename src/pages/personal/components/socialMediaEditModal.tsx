import React, { useCallback, useState } from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'
import { SocialMediaParam } from '../../../apis/auth'
import DefaultBannerImg from '../../../assets/images/home/default-user-background.webp'
import Flex from '../../../contexts/theme/components/Box/Flex'
import Text from '../../../contexts/theme/components/Text/Text'
import StyledTextField from '../../../contexts/theme/components/TextField'
import { Box } from '@mui/material'
import CustomizeButton from '../../../contexts/theme/components/Button'
import { SyncLoader } from 'react-spinners'

const Wrapper = styled('div')`
  max-height: 300px;
  width: 600px;
  
`

const Label = styled('div')`
  font-family: Kanit-Regular;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main};
`

const defaultFormValues:SocialMediaParam = {
  twitterAddr:'',
  telegramAddr:'',
}

const SocialMediaEditModal:React.FC = () => {
  const [formValues, setFormValues] = useState(defaultFormValues)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = useCallback(async (e:any) => {
    e.preventDefault()

    console.log(formValues)
    return
  }, [formValues])

  return (
    <Dialog title={'Profile details'} closeable={true} variant={'info'} >
      <Wrapper>
        <form  onSubmit={handleSubmit} >
          <Flex  width={'100%'} flexDirection={'column'} >
            <Box sx={{ marginBottom:'20px' }}>
              <Label >Twitter website:</Label>
              <StyledTextField
                fullWidth={true}
                size={'medium'}
                placeholder={''}
                onChange ={(res:any) => {handleInputChange(res)}}
                variant={'outlined'}
                name={'twitterAddr'}
                required
              />
            </Box>
            <Label >Telegram website:</Label>
            <StyledTextField
              fullWidth={true}
              size={'medium'}
              placeholder={''}
              onChange ={(res:any) => {handleInputChange(res)}}
              variant={'outlined'}
              name={'telegramAddr'}
              required
            />

            <Box sx={{ width: '100%', display:'center', justifyContent: 'center', marginTop:'40px' }}>
              <CustomizeButton variant="contained" color="secondary" type="submit">
                Save
              </CustomizeButton>
            </Box>

          </Flex>
        </form>
      </Wrapper>
    </Dialog>

  )
}

export default SocialMediaEditModal
