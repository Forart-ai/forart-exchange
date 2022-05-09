import React from 'react'
import routes from '../../routes'
import { MenuItem, MenuList, Paper, styled, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { gameRoutes } from './routes'
import Sticky from 'react-sticky-el'

export const MenuContainer = styled('div')`
   min-height: 100vh;
   max-width: 240px;
   border-right: 1px ${({ theme }) => theme.palette.secondary.light} solid;
   position: relative;
   left: 0;
`

export const StyledMenuList = styled(MenuList)`
&.MuiList-root {
  padding: 10px 20px;
  
}

`

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    border-radius: 10px;
  }
`

export const SelectedMenuItem = styled(MenuItem)`

  &.MuiMenuItem-root {
    border-radius: 10px;
    color: ${({ theme }) => theme.palette.primary.light};
    background-color: ${({ theme }) => theme.palette.secondary.dark};

  }
  

`

export const MenuPaper = styled(Paper)`

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

export const GamePageSidebar: React.FC = () => {

  const { pathname }  = useLocation()
  console.log(pathname)
  return (

    <MenuContainer className={'sidebar'}>

      <MenuPaper sx={{ width: 230 }}>
        <Sticky positionRecheckInterval={60} >
          {
            gameRoutes.map((route, index) => {
              return (

                <Link to={`/game/${route.path}`}  key={index}>
                  <StyledMenuList>

                    {
                      pathname === `/game/${route.path}` ? (
                        <SelectedMenuItem>
                          <Typography  variant={'inherit'}>
                            {route.title}
                          </Typography>
                        </SelectedMenuItem>
                      ) :
                        <StyledMenuItem>
                          <Typography  variant={'inherit'}>
                            {route.title}
                          </Typography>
                        </StyledMenuItem>
                    }

                  </StyledMenuList>

                </Link>

              )
            })
          }
        </Sticky>
      </MenuPaper>

    </MenuContainer>

  )
}

