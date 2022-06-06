import React, { useCallback, useState } from 'react'
import DefaultPageWrapper from '../../../../components/default-page-wrapper'
import Text from '../../../../contexts/theme/components/Text/Text'
import { styled } from '@mui/system'
import StyledTextField from '../../../../contexts/theme/components/TextField'
import { Chip, IconButton, InputBase, Paper } from '@mui/material'
import { SearchOffRounded } from '@mui/icons-material'
import { textToImage } from '../../../../apis/ai'
import Flex from '../../../../contexts/theme/components/Box/Flex'

const Container = styled('div')`
  display: flex;
  max-width: calc(100vw - 240px);
  width: 1024px;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 64px;
`

const ResultImageContainer = styled('div')`
  width: 100%;
  margin-top: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`

const TextToImage:React.FC = () => {
  const [prompt, setPrompt] = useState<string>('Cyberpunk Xiamen, Trending on artstation, Sky, Fluttering butterfly')
  const [resultImage, setResultImage] = useState<any>()

  const handleTextToImage = useCallback(
    () => {
      if (!prompt) return

      textToImage(prompt).then(res => {
        console.log(res)
        setResultImage(res)
      })
    },
    [prompt],
  )

  return (
    <Flex width={'100%'} flexDirection={'column'} alignItems={'center'}>
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
            defaultValue={prompt}
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

        <ResultImageContainer>
          { resultImage && <img src={resultImage} />}
        </ResultImageContainer>

      </Container>
    </Flex>
  )
}

export default TextToImage
