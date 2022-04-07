import { createTheme } from '@mui/material/styles'

const ForartTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: '#85fcd0',
      main: '#4fc89f',
      dark: '#009671',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ba75ff',
      main: '#8345f4',
      dark: '#4a10c0',
      contrastText: '#fff',
    },
    text:{
      primary: '#fff',
      secondary: '#A197AA',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: 'rgb(34,30,57)',
      paper:'rgb(23,20,42)'
    },
  },
  spacing: 10,

})

export default ForartTheme
