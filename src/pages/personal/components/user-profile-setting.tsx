import React, { useRef, useState } from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { Box, Input, makeStyles, styled, Theme, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import useLocalStorage from '../../../hooks/useLocalStorage'
import StyledTextField from '../../../contexts/theme/components/TextField'

const Wrapper = styled('div')`
  height: 400px;
  font-family: Arial;
`

const Item = styled('div')`
    
`

const Title = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 18px;
`

interface FormProps {
    saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

const defaultFormValues = {
  banner:'',
  username: '',
  userId: '',
  avatar:''
}

const UserProfileSetting:React.FC = () => {

  const token = useLocalStorage('dd')

  const [formValues, setFormValues] = useState(defaultFormValues)

  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    console.log(name, value)
    console.log(e)
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleCapture = ( e : any) => {
    const { name, files } = e.target
    setFormValues({
      ...formValues,
      [name]: files[0]
    })
  }

  const handleAvatarCapture = ({ target }: any) => {
    setFormValues({
      ...formValues,
      avatar: target.files[0]
    })
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(formValues)
  }

  return (
    <Dialog title={'User Profile'} closeable={true} >
      <Wrapper >
        <form onSubmit={handleSubmit}>
          <Item>
            <Title>
              Profile Banner
            </Title>
            <label htmlFor="contained-button-file">
              <Input name={'banner'} onChange={handleCapture}  id="contained-button-file"  type="file" hidden />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Item>

          <Item>
            <Title>
              Profile Avatar
            </Title>
            <label htmlFor="avatar-contained-button-file">
              <Input name={'avatar'} onChange={handleCapture}  id="avatar-contained-button-file"  type="file" hidden />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Item>

          <Item>
            <Title>Username</Title>
            <StyledTextField
              fullWidth={true}
              size={'medium'}
              placeholder={''}
              onChange ={(res:any) => {handleInputChange(res)}}
              variant={'outlined'}
              name={'username'}
            />
          </Item>

          <Item>
            <Title>UserId</Title>
            <StyledTextField
              fullWidth={true}
              size={'medium'}
              placeholder={''}
              onChange ={(res:any) => {handleInputChange(res)}}
              variant={'outlined'}
              name={'userId'}
            />
          </Item>

          <Box sx={{ width: '100%', display:'center', justifyContent: 'center', marginTop:'40px' }}>
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </Box>
        </form>

      </Wrapper>
    </Dialog>
  )
}

export default UserProfileSetting
