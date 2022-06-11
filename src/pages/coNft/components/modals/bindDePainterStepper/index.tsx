import React, { useCallback, useEffect, useState } from 'react'
import Dialog from '../../../../../contexts/theme/components/Dialog/Dialog'
import { styled } from '@mui/system'
import { Box, Checkbox, MobileStepper, Paper, SvgIcon, Tooltip, useTheme } from '@mui/material'
import Text from '../../../../../contexts/theme/components/Text/Text'
import CustomizeButton from '../../../../../contexts/theme/components/Button'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import BindDePainter from './bindDePainter'
import BindEthAndSolanaWallet from './bindEthAndSolanaWallet'
import FinalReconfirmation from './finalReconfirmation'

const Wrapper = styled('div')`
`

const BindDePainterStepper:React.FC = () => {

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const [allowNextStep, setAllowNextStep] = useState<boolean | undefined>(false)
  const [forceNext, setForceNext] = useState<boolean | undefined>()

  useEffect(() => {
    console.log('allow?', allowNextStep)
  }, [allowNextStep])

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    console.log('next')
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = [
    {
      label: '1. Connect Phantom and Metamask wallet',
      description: (<BindEthAndSolanaWallet onBound={v => setAllowNextStep(v)} />)
    },
    {
      label: '2. Bind a dePainter',
      description: (
        <BindDePainter
          forceNext={v =>  handleNext() }
          onBound={v => setAllowNextStep(v)}
        />
      )
    },
    {
      label: '3. Everything is ready',
      description: (<FinalReconfirmation />)
    }
  ]

  const maxSteps = steps.length

  return (
    <Dialog variant={'info'} title={'Something to do first'} closeable>
      <Wrapper>
        <Paper
          square
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
          }}
        >
          <Text color={'#ffffff'} fontSize={16}>{steps[activeStep].label}</Text>
        </Paper>
        <Box sx={{ height: 360, maxWidth: 600, width: '100%', p: 1 }}>
          {steps[activeStep].description}
        </Box>
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <CustomizeButton
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1 ||  !allowNextStep }
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </CustomizeButton>
          }
          backButton={
            <CustomizeButton size="small" onClick={handleBack} disabled={activeStep === 0 }>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </CustomizeButton>
          }
        />
      </Wrapper>
    </Dialog>
  )
}

export default BindDePainterStepper
