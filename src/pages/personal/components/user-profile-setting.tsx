import React, { useCallback, useEffect, useRef, useState } from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { Box, Input, makeStyles, styled, Theme, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import useLocalStorage from '../../../hooks/useLocalStorage'
import StyledTextField from '../../../contexts/theme/components/TextField'
import AUTH_API, { UserInfoParam } from '../../../apis/auth'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import DefaultBannerImg from '../../../assets/images/home/default-user-background.webp'
import DefaultAvatarImg from '../../../assets/images/header/avatar.png'
import { useGetUserInfo } from '../../../hooks/queries/useGetUserInfo'
import wallet from '../../../components/wallet'
import { useRefreshController } from '../../../contexts/refresh-controller'
import { useModal } from '../../../contexts/modal'

const Wrapper = styled('div')`
  width: 400px;
  font-family: Arial;
`

const Item = styled('div')`
  margin-bottom: 20px;
    
`

const Title = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-size: 18px;
`

const DefaultBanner = styled('div')`
  width: 100%;
  height: 130px;
  
  :hover {
    opacity: .7;
    cursor: pointer;
    filter: alpha(Opacity=60);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`

const DefaultAvatar = styled('div')`
  width: 64px;
  height: 64px;
  
  :hover {
    opacity: .7;
    cursor: pointer;
    filter: alpha(Opacity=60);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`

const defaultFormValues:UserInfoParam = {
  banneruri:'',
  username: '',
  avataruri:'',
  wallet:''
}

const UserProfileSetting:React.FC<{userInfo?: UserInfoParam}> = ({ userInfo }) => {
  const { account } = useSolanaWeb3()
  // const { data: userInfo } = useGetUserInfo()
  const { closeModal } = useModal()
  const { forceRefresh } = useRefreshController()

  const [formValues, setFormValues] = useState(defaultFormValues)

  useEffect(() => {

    setFormValues({
      banneruri: userInfo?.banneruri,
      username: userInfo?.username,
      wallet: account?.toBase58(),
      avataruri: userInfo?.avataruri,
      slogan: userInfo?.slogan
    })

  }, [userInfo,account])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleCapture = ( e : any) => {
    const { name, files } = e.target

    AUTH_API.uploadImage({ file: files[0], wallet: account?.toBase58() }).then(res => {
      setFormValues({
        ...formValues,
        [name]:res
      })
    })

  }

  const handleSubmit = useCallback((e:any) => {
    e.preventDefault()
    AUTH_API.updateUserInfo(formValues).then(res => {
      console.log(res)
      forceRefresh()
      closeModal()
    })
  }, [formValues])

  return (
    <Dialog title={'User Profile'} closeable={true} >
      <Wrapper >
        <form onSubmit={handleSubmit}>
          <Item>
            <Title>
              Profile Banner
            </Title>
            <label htmlFor="contained-button-file">
              <Input name={'banneruri'} onChange={handleCapture}  id="contained-button-file"  type="file" hidden />
              <DefaultBanner>
                {
                  formValues.banneruri ? <img src={formValues.banneruri} /> : <img src={DefaultBannerImg} />
                }
              </DefaultBanner>
            </label>
          </Item>

          <Item>
            <Title>
              Profile Avatar
            </Title>
            <label htmlFor="avatar-contained-button-file">
              <Input name={'avataruri'} onChange={handleCapture}  id="avatar-contained-button-file"  type="file" hidden />
              <DefaultAvatar>
                {
                  formValues.avataruri ? <img src={formValues.avataruri} /> : <img src={DefaultAvatarImg} />
                }
              </DefaultAvatar>

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
            <Title>Slogan</Title>
            <StyledTextField
              fullWidth={true}
              size={'medium'}
              placeholder={''}
              onChange ={(res:any) => {handleInputChange(res)}}
              variant={'outlined'}
              name={'slogan'}
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
