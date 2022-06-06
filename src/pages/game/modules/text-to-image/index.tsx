import React, { useCallback, useState } from 'react'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import Text from '../../../../contexts/theme/components/Text/Text'
import { styled } from '@mui/system'
import StyledTextField from '../../../../contexts/theme/components/TextField'
import { Chip, IconButton, InputBase, Paper } from '@mui/material'
import { SearchOffRounded } from '@mui/icons-material'
import { textToImage } from '../../../../apis/ai'

const Container = styled('div')`
  margin-top: 60px;
  max-width: 600px;
  
`

const TextToImage:React.FC = () => {
  const [prompt, setPrompt] = useState<string>()

  const handleTextToImage = useCallback(
    () => {
      if (!prompt) return

      textToImage(prompt).then(res => {
        console.log(res)
      })
    },
    [prompt],
  )

  return (
    <DefaultPageWrapper>
      <Container>
        <Text fontSize={24}>Describe what you want to see</Text>
        <Text color={'#999999'} fontFamily={'Kanit-Light'} fontSize={18} mb={'30px'}>
          You can add weight after a word and it will be reflected in the picture. example &apos;Red:7&apos;.
        </Text>
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >

          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="DNA tornado"
            fullWidth
            onChange={e => setPrompt(e.target.value)}
          />
          <IconButton
            sx={{ p: '10px' }}
            onClick={handleTextToImage}
          >
            <SearchOffRounded />
          </IconButton>

        </Paper>
        {/*<Chip*/}
        {/*  label="Custom delete icon"*/}
        {/*  onClick={()=>{}}*/}
        {/*  variant="outlined"*/}
        {/*/>*/}
      </Container>
    </DefaultPageWrapper>
  )
}

export default TextToImage
