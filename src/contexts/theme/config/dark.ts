import { createTheme } from '@mui/material/styles'

const ForartTheme = createTheme({

  breakpoints: {
    values: {
      xs: 370,
      sm: 576,
      md: 852,
      lg: 968,
      xl: 1080,
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
    text:{
      primary: '#fff',
      secondary: '#A197AA',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: 'rgb(34,30,57)',
      paper: 'rgb(40,0,90)'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#999999'
    }
  },
  spacing: 10,

})

export default ForartTheme
