import React, { useCallback, useEffect, useState } from 'react'
import {
  Step, StepContent,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme
} from '@mui/material'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import BindDePainter from './bindDePainter'
import BindEthAndSolanaWallet from './bindEthAndSolanaWallet'
import FinalReconfirmation from './finalReconfirmation'
import Flex from '../../../../../contexts/theme/components/Box/Flex'
import { useModal } from '../../../../../contexts/modal'
import { ArtistKit } from '../../../../../hooks/queries/useArtistKitsQuery'
import { useUserBoundedDepainter } from '../../../../../hooks/queries/account/useUserBoundedDepainter'
import { useNFTQuery } from '../../../../../hooks/queries/account/useOwnedNFTsQuery'
import Image from '../../../../../contexts/theme/components/Image'
import { SyncLoader } from 'react-spinners'
import { useSolanaWeb3 } from '../../../../../contexts/solana-web3'
import { useWeb3React } from '@web3-react/core'
import { NFTPreview } from '../../../../../components/nft-mint/selectedList'
import useNFTCreate from '../../../../../hooks/co-nft/useNFTCreate'
import { useCreditCreation } from '../../../../../hooks/queries/useCreditCreation'
import { styled } from '@mui/system'

const StepperContainer = styled('div')`
  width: 100%;
  border: 1px ${({ theme }) => theme.palette.primary.main} solid;
  padding: 20px 10px;
  border-radius: .6rem;
  background: rgb(14, 8, 45, .8);
`

const PreviewContainer = styled('div')`
  width: 90%;
  max-width: 164px;
  height: 164px;
  object-fit: contain;
  box-sizing: border-box;
  position: relative;
`

const Text = styled('div')`
  color: white;
  
  b {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const BindDePainterStepper:React.FC<{ body?: ArtistKit, attr?: ArtistKit[]}> = ({ body, attr }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('md'))
  const { openModal } = useModal()
  const { data: userBoundDePainter } = useUserBoundedDepainter()
  const nft = useNFTQuery(userBoundDePainter?.mintKey)
  const { account: solAccount } = useSolanaWeb3()
  const { account: ethAccount } = useWeb3React()
  const { createNFT } = useNFTCreate()

  const { data: userCredit } = useCreditCreation(1025)

  useEffect(() => {
    if (solAccount && ethAccount && nft) {
      setActiveStep(2)
    }

  }, [userBoundDePainter])

  const beforeCreateNft = useCallback(
    () => {
      if (!body || !attr) return
      createNFT(body, attr)
    }, [body,solAccount, ethAccount ,attr]
  )

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <StepperContainer>
      <Stepper activeStep={activeStep} alternativeLabel={mobile ? false : true} orientation={mobile ? 'vertical' : 'horizontal'}>
        <Step >
          <StepLabel >Connect wallet</StepLabel>
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
          <StepLabel>Bind DePainter { mobile &&  <CustomizeButton onClick={handleBack}>Prev step</CustomizeButton> }</StepLabel>
          {
            mobile ?
              <StepContent>
                {
                  solAccount && (
                    <>
                      {
                        nft ?
                          <>
                            <Image src={nft.data?.data?.image} width={'164px'} height={'164px'} variant={'rectangular'} borderRadius={6} />
                            <Text>Bound {nft.data?.data?.name}</Text>

                          </>
                          :
                          <SyncLoader color={'white'} size={6} />
                      }
                    </>
                  )
                }
                <CustomizeButton disabled={!solAccount} variant={'contained'} color={'secondary'} onClick={() => openModal(<BindDePainter onBound={() => true} forceNext={() => true} />)}>
                  {
                    userBoundDePainter?.mintKey ? 'Change Bind' : ' Bind Now'
                  }
                </CustomizeButton>
              </StepContent>
              :
              <Flex alignItems={'center'} flexDirection={'column'} justifyContent={'center'} gap={'14px'}>
                {
                  solAccount && (
                    <>
                      {
                        nft ?
                          <>
                            <Image src={nft.data?.data?.image} width={'164px'} height={'164px'} variant={'rectangular'} borderRadius={6} />
                            <Text >Bound {nft.data?.data?.name}</Text>

                          </>
                          :
                          <SyncLoader color={'white'} size={6} />
                      }
                    </>
                  )
                }
                <CustomizeButton disabled={!solAccount} variant={'contained'} color={'secondary'} onClick={() => openModal(<BindDePainter onBound={() => true} forceNext={() => true} />)}>
                  {
                    userBoundDePainter?.mintKey ? 'Change Bind' : ' Bind Now'
                  }
                </CustomizeButton>

              </Flex>
          }
        </Step>

        <Step>
          <StepLabel>All ready!  { mobile &&  <CustomizeButton onClick={handleBack}>Prev step</CustomizeButton> }</StepLabel>
          <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'14px'}>

            <PreviewContainer>
              <NFTPreview body={body} attrList={attr} />
            </PreviewContainer>
            <Text >{ userCredit == 0 ? <>Have <b> {userCredit} </b> create chances</> : 'No chances left'}</Text>
            <CustomizeButton disabled={!solAccount || !ethAccount || !userBoundDePainter?.mintKey } variant={'contained'} onClick={beforeCreateNft}> Create Now!</CustomizeButton>
          </Flex>
        </Step>

      </Stepper>

    </StepperContainer>
  )
}

export default BindDePainterStepper
