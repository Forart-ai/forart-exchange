import { createTheme } from '@mui/material/styles'

const ForartTheme = createTheme({

  breakpoints: {
    values: {
      xs: 370,
      sm: 576,
      md: 852,
      lg: 968,
      xl: 1360,
    },
  },
  palette: {
    mode:'dark',
    primary: {
      light: '#85fcd0',
      main: '#4fc89f',
      dark: '#009671',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ba75ff',
      main: '#8246F5',
      dark: '#5000B4',
      contrastText: '#fff',
    },
    success: {
      main: '#50dcb5',
      light: '#da6060',
      dark: '#880a0a',
      contrastText: '#fff',
    },
    error: {
      main: '#d32f2f',
      light: '#da6060',
      dark: '#880a0a',
      contrastText: '#fff',
    },
    warning: {
      main: '#ff6a00',
      light: '#ffb500',
      dark: '#880a0a',
      contrastText: '#fff',
    },

    text:{
      primary: '#fff',
      secondary: '#A197AA',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: 'rgb(10,5,35)',
      paper: 'rgb(40,0,90)'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#999999'
    },
    action: {
      disabled: 'rgba(255,255,255,0.4)',
    }
  },
  spacing: 10,

})

export default ForartTheme
