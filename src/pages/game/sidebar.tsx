import React from 'react'
import routes from '../../routes'
import { MenuItem, MenuList, Paper, styled, SvgIcon, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { gameRoutes } from './routes'
import { Sticky, StickyContainer } from 'react-sticky'
import { Arrow_Down, Robot_Outline } from '../../contexts/svgIcons'
import Text from '../../contexts/theme/components/Text/Text'

const getStyleByPath = ({  $path }: any) => {
  switch ($path) {
  case 'Aiart':
    return {
      background:'linear-gradient(98deg, #5000B4 2.09%, #8246F5 97.91%)',
    }

  case 'Transformation':
    return {
      background:'linear-gradient(98deg, #E91383  2.09%, #CE17B7 97.91%)',
    }

  default:{
    return {
      background: 'red',
    }
  }
  }
}

export const MenuContainer = styled('div')`
   min-height: 100vh;
   width: 300px;
   border-right: 1px ${({ theme }) => theme.palette.secondary.light} solid;
   position: relative;
   left: 0;
`

export const StyledMenuList = styled('div')`
  height: 50px;
  margin-bottom: 20px;
  width: 100%;

`

export const StyledMenuItem = styled('div')`
  background-color: rgb(26,26,26);
  height: 100%;
  width: 100%;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  

  
`

export const SelectedMenuItem = styled('div')<{$path?: string}>`
  height: 100%;
  width: 100%;
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 20px;
  transition: all 3s;
  animation-name: rubberBand;
  animation-duration: 1s;
  animation-fill-mode: both;
  
  @keyframes rubberBand {
    from {
      transform: scale3d(1, 1, 1);
    }

    30% {
      transform: scale3d(1.1, 0.75, 1);
    }

    40% {
      transform: scale3d(0.75, 1.25, 1);
    }

    50% {
      transform: scale3d(1.15, 0.85, 1);
    }

    65% {
      transform: scale3d(0.8, 1.05, 1);
    }

    75% {
      transform: scale3d(1.05, 0.95, 1);
    }

    to {
      transform: scale3d(1, 1, 1);
    }
  }
  ${getStyleByPath}


`

export const MenuPaper = styled(Paper)`
  position: relative;
  padding: 10px 20px;
  min-width: 100%;
  a {
    color: ${({ theme }) => theme.palette.secondary.light};
  }
  &.MuiPaper-root {
    background-color: transparent;
    box-shadow: none;
    background-image: none;
    color: ${({ theme }) => theme.palette.secondary.light};

  }
`

const StyledSvgIcon = styled(SvgIcon)`
  width: 40px;
  height: 40px;
  padding: 6px;
  margin-right: 10px;
  background-color: rgba(54,58,68,.4);
  border-radius: 50%;
  color: white;
`

export const GamePageSidebar: React.FC = () => {

  const { pathname }  = useLocation()
  return (
    <StickyContainer >
      <MenuContainer className={'sidebar'}>

        <MenuPaper sx={{ width: 230 }}>
          <Sticky>
            {
              ({ style, isSticky=true }) => (

                <div style={{ ...style, marginTop: isSticky ? '60px' : 0  }}>
                  {
                    gameRoutes.map((route, index) => {
                      return (

                        <Link to={`/game/${route.path}`}  key={index}>
                          <StyledMenuList >
                            {
                              pathname === `/game/${route.path}` ? (
                                <SelectedMenuItem $path={route.title.toString()}>
                                  <StyledSvgIcon > <path fill="currentColor" d={Robot_Outline} /> </StyledSvgIcon>
                                  <Text fontSize={16} color={'white'} fontFamily={'Kanit-Regular'}>{route.title}</Text>
                                </SelectedMenuItem>
                              ) :
                                <StyledMenuItem >
                                  <StyledSvgIcon> <path fill="currentColor" d={Robot_Outline} /> </StyledSvgIcon>
                                  <Text fontSize={16} color={'white'} fontFamily={'Kanit-Regular'}>{route.title}</Text>
                                </StyledMenuItem>
                            }

                          </StyledMenuList >

                        </Link>

                      )
                    })
                  }
                </div>

              )
            }

          </Sticky>
        </MenuPaper>

      </MenuContainer>
    </StickyContainer>
  )
}

