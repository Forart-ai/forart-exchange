import React from 'react'
import routes from '../../routes'
import {
  Box,
  CssBaseline,
  CSSObject,
  Divider,
  IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  MenuItem,
  MenuList,
  Paper,
  styled,
  SvgIcon, Theme,
  Toolbar,
  Typography,
  useTheme
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { gameRoutes } from './routes'
import { Sticky, StickyContainer } from 'react-sticky'
import { Arrow_Down, Robot_Outline } from '../../contexts/svgIcons'
import Text from '../../contexts/theme/components/Text/Text'
import {
  ChevronLeftRounded,
  ChevronRightRounded,
  IndeterminateCheckBox, MailLockOutlined,
  MenuBook,
  MenuBookOutlined
} from '@mui/icons-material'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

const drawerWidth = 240

const getStyleByPath = ({  $path }: any) => {
  switch ($path) {
  case 'Soul Card':
    return {
      background:'linear-gradient(98deg, #5000B4 2.09%, #8246F5 97.91%)',
    }

  case 'Magic Wand':
    return {
      background:'linear-gradient(98deg, #EB1482  2.09%, #CD19B9 97.91%)',
    }

  default:{
    return {
      background: 'darkblue',
    }
  }
  }
}

export const StyledMenuItem = styled('div')<{$path?: string, open: boolean }>`
  height: 100%;
  width: ${props => props.open ? '100%' : '50px'};
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.open ? 'flex-start' : 'center'};
  gap: 10px;

  padding: 0 5px;
  opacity: .34;
  position: relative;
  overflow: hidden;
  transition: all .45s;


  ${getStyleByPath}

  
`

export const SelectedMenuItem = styled('div')<{$path?: string, open: boolean}>`
  height: 100%;
  width: ${props => props.open ? '100%' : '50px'};
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: ${props => props.open ? 'flex-start' : 'center'};
  padding: 0 5px;
  gap: 10px;
  transition: all .45s;
  animation-name: rubberBand;
  animation-duration: 1s;
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

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

const StyledSvgIcon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  min-width: 42px;
  height: 42px;
  border-radius: 50%;
`

const BlurredIcon = styled('div')<{open: boolean}>`
  position: absolute;
  opacity: .6;
  right: -10px;
  top: 4px;
  
  display: ${props => props.open ? '' : 'none'};
  
`

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div') `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  
  `

export const StyledMenuList = styled('div')<{open: boolean}>`
  height: 50px;
  margin-bottom: 20px;
  width: 100%;
  padding:0 10px;
  

`

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    '& .MuiPaper-root': {
      top:'60px',
      backgroundColor: theme.palette.background.default,
      borderRight: `1px ${ theme.palette.secondary.main} solid`,

    },
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export const GamePageSidebar: React.FC = () => {

  const { pathname }  = useLocation()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  return (
    <Drawer  variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <ChevronLeftRounded /> : <ChevronRightRounded />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/*<List>*/}
      {/*  {*/}
      {/*    gameRoutes.map((route, index) => (*/}
      {/*      <ListItem key={index} disablePadding sx={{ display: 'block' }}>*/}
      {/*        <ListItemButton*/}
      {/*          sx={{*/}
      {/*            minHeight: 48,*/}
      {/*            justifyContent: open ? 'initial' : 'center',*/}
      {/*            px: 2.5,*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          <ListItemIcon*/}
      {/*            sx={{*/}
      {/*              minWidth: 0,*/}
      {/*              mr: open ? 3 : 'auto',*/}
      {/*              justifyContent: 'center',*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            {index % 2 === 0 ? <IndeterminateCheckBox /> : <MailLockOutlined />}*/}
      {/*          </ListItemIcon>*/}
      {/*          <ListItemText primary={route.path} sx={{ opacity: open ? 1 : 0 }} />*/}
      {/*        </ListItemButton>*/}
      {/*      </ListItem>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*</List>*/}

      <div>
        {
          gameRoutes.map((route, index) => {
            return (
              <Link to={`/game/${route.path}`}  key={index}>
                <StyledMenuList open={open} >
                  {
                    pathname === `/game/${route.path}` ? (
                      <SelectedMenuItem $path={route.title.toString()} open={open}>
                        <StyledSvgIcon>
                          { route.icon && <route.icon height={20} width={20} /> }
                        </StyledSvgIcon>

                        <Text display={open ? '' : 'none'} fontSize={16} color={'white'} fontFamily={'Kanit-Regular'}>
                          { route.title }
                        </Text>
                        <BlurredIcon open={open}  >
                          { route.icon && <route.icon height={64} width={64} /> }
                        </BlurredIcon>
                      </SelectedMenuItem>
                    ) :
                      <StyledMenuItem $path={route.title} open={open} >
                        <StyledSvgIcon>
                          { route.icon && <route.icon height={20} width={20} /> }
                        </StyledSvgIcon>

                        <Text display={open ? '' : 'none'} fontSize={16} color={'white'} fontFamily={'Kanit-Regular'}>
                          { route.title }
                        </Text>

                        <BlurredIcon open={open} >
                          { route.icon && <route.icon height={64} width={64} /> }
                        </BlurredIcon>
                      </StyledMenuItem>
                  }
                </StyledMenuList >
              </Link>
            )
          })
        }
      </div>

      <Divider />

    </Drawer>
  )
}

