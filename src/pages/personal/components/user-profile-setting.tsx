import React, { useCallback, useEffect, useRef, useState } from 'react'
import Dialog from '../../../contexts/theme/components/Dialog/Dialog'
import { Box, Input, makeStyles, styled, Theme, Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import useLocalStorage from '../../../hooks/useLocalStorage'
import StyledTextField from '../../../contexts/theme/components/TextField'
import { AUTH_API, UserInfoParam } from '../../../apis/auth'
import { useSolanaWeb3 } from '../../../contexts/solana-web3'
import DefaultBannerImg from '../../../assets/images/home/default-user-background.webp'
import DefaultAvatarImg from '../../../assets/images/header/avatar.png'
import { useGetUserInfo } from '../../../hooks/queries/useGetUserInfo'
import wallet from '../../../components/wallet'
import { useRefreshController } from '../../../contexts/refresh-controller'
import { useModal } from '../../../contexts/modal'
import { useSnackbar } from 'notistack'
import CustomizeButton from '../../../contexts/theme/components/Button'
import { SyncLoader } from 'react-spinners'

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
  font-family: Kanit-Regular;
`

const DefaultBanner = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  
  :hover {
    opacity: .7;
    cursor: pointer;
    filter: alpha(Opacity=60);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;

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
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)

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
    console.log(files[0])
    if ((files[0].size / 1024) / 1024 > 3) {
      enqueueSnackbar('Sorry, image must smaller than 3MB', { variant:'warning' })
      return
    }

    if (!files[0].type.includes('image')) {
      enqueueSnackbar('Sorry, it must be an image type', { variant:'warning' })
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = function (v) {
      if (v.target && typeof v.target.result === 'string') {
        (document.getElementById(`${name}`) as any).src = v.target.result
      }
    }

    setFormValues({
      ...formValues,
      [name]:files[0]
    })

  }

  const handleSubmit = useCallback(async (e:any) => {
    e.preventDefault()
    setLoading(true)

    if (typeof formValues.banneruri !=='string') {
      await  AUTH_API.uploadBannerImage({ wallet:account?.toBase58(), file:formValues.banneruri }).then((res:any) => {
        formValues.banneruri = res
      })
    }

    if (typeof formValues.avataruri !== 'string') {
      await AUTH_API.uploadAvatarImage({ wallet:account?.toBase58(), file:formValues.avataruri }).then((res:any) => {
        formValues.avataruri = res
      })
    }

    AUTH_API.updateUserInfo(formValues).then(() => {
      forceRefresh()
      setLoading(false)
      enqueueSnackbar('Edit successfully', { variant:'success' })
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
            <label htmlFor="banner-file">
              <input accept={'image/*'}  name={'banneruri'} onChange={handleCapture}  id="banner-file"  type="file" hidden />
              <DefaultBanner>
                {
                  userInfo?.banneruri ? <img  id={'banneruri'} src={userInfo.banneruri} /> : <img id={'banneruri'}  src={DefaultBannerImg} />
                }
              </DefaultBanner>
            </label>
          </Item>

          <Item>
            <Title>
              Profile Avatar
            </Title>
            <label htmlFor="avatar-contained-button-file">
              <Input name={'avataruri'} onChange={handleCapture} id="avatar-contained-button-file"  type="file" hidden />
              <DefaultAvatar>
                {
                  userInfo?.banneruri ? <img  id={'avataruri'} src={userInfo.avataruri} /> :   <img id={'avataruri'} src={DefaultAvatarImg} />
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
              defaultValue={userInfo?.username}
              required
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
              defaultValue={userInfo?.slogan}
              required
            />
          </Item>

          <Box sx={{ width: '100%', display:'center', justifyContent: 'center', marginTop:'40px' }}>
            <CustomizeButton disabled={loading} variant="contained" color="secondary" type="submit">
              Save
              {
                loading && <SyncLoader size={6} color={'white'} />
              }
            </CustomizeButton>
          </Box>
        </form>
      </Wrapper>
    </Dialog>
  )
}

export default UserProfileSetting
