import React, { useMemo } from 'react'
import { Box, ThemeProvider } from '@mui/material'
import { MintedNFTItem } from '../../types/coNFT'
import ForartTheme from '../../contexts/theme/config/dark'
import darkTheme from 'web3modal/dist/themes/dark'
import UploadIcon from '../../assets/images/coPools/upload.svg'
import styled, { keyframes } from 'styled-components'
import { AttributesItem } from '../../components/attributes-item'
import { useFindComponent } from '../../hooks/queries/useFindComponent'

export const ShineKeyFrame = keyframes`
  0% {
    background-position-x: -100%;
  }

  12% {
    background-position-x: -70%;
  }

  30%, 100% {
    background-position-x: 200%;
  }
`

export const LevelLabel = styled.div<{ color: string, shine?: boolean }>`
  font-size: 18px;
  color: ${props => props.color.replace(/(\d)\)/, '$1, 0.9)')};
  animation: ${ShineKeyFrame} 2s infinite linear;
  margin-left: 12px;
  ${p => p.shine ? `
    background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 65%);
    -webkit-background-clip: text;
    background-size: 60% 160%;
    background-repeat: no-repeat;
    background-position: -100% 0;
  ` : ''}
`

const CONFTDetail:React.FC<{item: MintedNFTItem}> = ({ item }) => {
  const { data: a } = useFindComponent(['207', '810', '1952', '2978', '3909', '4311', '5247', '6626', '8569', '9267'])

  const attr = useMemo(() => {
    return a?.map((v: any) => ({
      chainMeta: JSON.parse(v.chainMeta)
    }))
  }, [ item,a])

  return (
    <ThemeProvider theme={ForartTheme}>
      <Box sx={{
        maxWidth: '100vw',
        width: '100%',
        height: '100%',
        minHeight:'100vh',
        overflow:'scroll'

      }}
      >
        <Box sx={{
          width: { xs: '100vw', md: 1400 },
          margin: 'auto',
          pt: 8,
          pb: 8,
          pr:1,
          pl:1
        }}
        >
          <Box sx= {{
            height: { xs: 'auto', md:450 },
            width: '100%',
            display: 'flex',
            justifyContent:'space-between',
            flexDirection: { xs: 'column', md: 'row' },
          }}
          >
            <Box component="img"
              sx={{
                height:' 100vw',
                width: '100vw',
                maxWidth:{ xs: '100%',  md: 450 },
                maxHeight :{ xs: '100%', md: 450 },
                borderRadius: 1
              }}
              src={item?.previewUrl}
            />
            <Box
              sx={{
                minWidth: { xs: '100%', md: '64%' },
                display: 'flex',
                flexDirection: 'column',
                padding: 1,
                justifyContent:'space-between',
                border: '1px red solid'

              }}
            >
              <Box sx ={{ display:'flex', flexDirection:'column' }}>
                <Box component={'div'}
                  sx={{ width:'100%',
                    display: 'flex',
                    justifyContent:'space-between',
                    alignItems:'center',
                    color: ForartTheme.palette.text.primary,
                    fontFamily:'inter-extraBold',
                    fontSize: { xs:24, md:28 }, }}
                >
                  <Box component={'div'} sx={{ display: 'flex', alignItems:'center' }}>
                    <div>Hypeteen #2199</div>
                    <div>
                      <LevelLabel color="rgb(255,223,89)" shine={true} >Legend</LevelLabel>
                    </div>
                  </Box>

                  <Box component="img"
                    sx={{
                      width: 35,
                      height: '100%',
                      cursor:'pointer'
                    }}
                    src={UploadIcon}
                  />
                </Box>
                <Box component={'div'}
                  sx={{
                    width:'100%',
                    color: ForartTheme.palette.text.secondary,
                    fontSize: 20,
                  }}
                >
                  <div>Hypeteen</div>
                </Box>
              </Box>

              <Box>
                <AttributesItem item={attr} />
              </Box>
            </Box>

          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  )
}

export default CONFTDetail
