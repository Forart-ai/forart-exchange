import React, { useCallback, useEffect, useState } from 'react'
import { useWhiteListQuery } from '../../../../../hooks/programs/useWhiteList'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import CharacterCustomize from '../../../../personal/modules/characterCustomize'
import { useModal } from '../../../../../contexts/modal'
import AttrReviewDialog from '../../../components/modals/create/attr-review'
import { Box, Step, StepContent, StepContext, StepLabel, Stepper, styled, useMediaQuery, useTheme } from '@mui/material'
import {  SyncLoader } from 'react-spinners'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import useStorageCheck from '../../../../../hooks/useStorageCheck'
import { ArtistKit, useArtistKitsQuery } from '../../../../../hooks/queries/useArtistKitsQuery'
import { useLocationQuery } from '../../../../../hooks/useLocationQuery'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'
import BindDePainterStepper  from '../../../components/modals/bindDePainterStepper'
import useNFTCreate from '../../../../../hooks/co-nft/useNFTCreate'
import BindEthAndSolanaWallet from '../../../components/modals/bindDePainterStepper/bindEthAndSolanaWallet'
import BindDePainter from '../../../components/modals/bindDePainterStepper/bindDePainter'
import Flex from '../../../../../contexts/theme/components/Box/Flex'

const Wrapper = styled('div')`
    width: 100%;
  margin: 0 auto;
`

const Operation = styled('div')`
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 20px;

  .message {
    font-family: KronaOne-Regular;
    color: ${({ theme }) => theme.palette.secondary.light};
    font-size: 16px;
    margin-bottom: 20px;
  }
`

const StepperContainer = styled('div')`
  width: 100%;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 20px 10px;
  border-radius: .6rem;
  background: rgb(14, 8, 45, .8);
`

const IdentifyCreate: React.FC = () => {
  const { createNFT } = useNFTCreate()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))
  const artistId = useLocationQuery('artistId')
  const { data, isFetching, error } = useWhiteListQuery()
  const { data: artistKit } = useArtistKitsQuery(artistId)
  const { account } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()

  const { openModal } = useModal()

  useStorageCheck()

  const [body, setBody] = useState<ArtistKit>()
  const [attr, setAttr] = useState<ArtistKit[]>()
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleCreate = useCallback(
    () => openModal(<AttrReviewDialog body={body} attr={attr} />),
    [body, attr, account]
  )

  const beforeCreateNft = useCallback(
    () => {
      if (!body || !attr) return
      createNFT(body, attr).then(r => {
        console.log(r)}
      )
    }, [body,account,attr]
  )

  const randomGenerate = useCallback(() => {
    if (!artistKit) return

    const availableBodies = artistKit.Body || artistKit.Helmet
    setBody(availableBodies[Math.floor(Math.random() * availableBodies?.length)])

    setAttr(
      Object.entries(artistKit)
        .filter(([key]) =>( key!=='Body') &&  key!=='Helmet')
        .reduce<ArtistKit[]>((res, next) => {
          const kits = next[1] as any[]

          return [
            ...res,
            kits[Math.floor(Math.random() * kits.length)]
          ]
        }, [])
    )
  }, [artistKit])

  useEffect(()=> {
    if (!artistKit) {
      return
    }
    if (artistKit.Body) {
      setBody(artistKit.Body[0])
      return
    }

    if (artistKit.Helmet) {
      setBody(artistKit.Helmet[0])
      return
    }

  }, [artistKit])

  if (!artistId) {
    return <></>
  }

  return (
    <Wrapper>
      <CharacterCustomize
        artistId={artistId}
        body={body}
        attr={attr}
        selected={(body, attributes) => {
          setBody(body)
          setAttr(attributes)
        }}
      />
      <Operation>
        <CustomizeButton
          size={'large'}
          variant={'contained'}
          color={'secondary'}
          onClick={randomGenerate}
        >
          Generate randomly
        </CustomizeButton>
      </Operation>

      {
        artistId === '1024' &&
          <Operation>
            {
              account ? (
                <div className={'message'}>
                  Mint chances: &nbsp;
                  {
                    error
                      ? <>{(error as any).message}</>
                      : (
                        !isFetching ? data : <SyncLoader color={'#8246F5'} size={8} />
                      )
                  }
                </div>
              ) : (
                <div className={'message'}>wallet unconnected</div>
              )
            }

            <Box display={'grid'} gridTemplateColumns={'repeat(2, max-content)'} gap={'16px'}>
              {
                data !== '0' ? (
                  <CustomizeButton
                    disabled={!data}
                    size={'large'}
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleCreate}
                  >
                    Mint now!
                  </CustomizeButton>
                ) : (
                  <CustomizeButton disabled={true} size={'large'} variant={'contained'} color={'secondary'}>
                    Run out of tickets
                  </CustomizeButton>
                )
              }
            </Box>

          </Operation>
      }

      {
        artistId === '1025' &&
        <Operation>

          {/*<Box display={'grid'} gridTemplateColumns={'repeat(2, max-content)'} gap={'16px'}>*/}

          {/*  <CustomizeButton variant={'contained'} onClick={() => openModal(<BindDePainterStepper />)}> Start creating!</CustomizeButton>*/}

          {/*  <CustomizeButton variant={'contained'} onClick={beforeCreateNft}>Test create</CustomizeButton>*/}

          {/*</Box>*/}
          <StepperContainer>
            <Stepper activeStep={activeStep} alternativeLabel={mobile ? false : true} orientation={mobile ? 'vertical' : 'horizontal'}>
              <Step>
                <StepLabel>Connect wallet</StepLabel>
                {
                  mobile ?
                    <StepContent>
                      <BindEthAndSolanaWallet onBound={v => {v ? setActiveStep(1) : setActiveStep(0)}} />
                    </StepContent>
                    :
                    <Flex justifyContent={'center'}>
                      <BindEthAndSolanaWallet onBound={v => {v ? setActiveStep(1) : setActiveStep(0)}} />
                    </Flex>
                }
              </Step>

              <Step>
                <StepLabel>Bind DePainter</StepLabel>
                {
                  mobile ?
                    <StepContent>
                      <CustomizeButton disabled={activeStep !== 1} variant={'contained'} color={'secondary'} onClick={() => openModal(<BindDePainter onBound={() => true} forceNext={() => true} />)}>Bind</CustomizeButton>
                    </StepContent>
                    :
                    <Flex justifyContent={'center'}>
                      <CustomizeButton disabled={activeStep !== 1} variant={'contained'} color={'secondary'} onClick={() => openModal(<BindDePainter onBound={() => true} forceNext={() => true} />)}>Bind</CustomizeButton>
                    </Flex>
                }
              </Step>

              <Step>
                <StepLabel>All ready!</StepLabel>
              </Step>

            </Stepper>

          </StepperContainer>

        </Operation>
      }
    </Wrapper>

  )

}

export default IdentifyCreate
