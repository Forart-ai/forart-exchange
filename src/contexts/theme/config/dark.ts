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
      light: '#ff64a3',
      main: '#e42575',
      dark: '#ac004a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#793d9e',
      main: '#4a0e6f',
      dark: '#1e0043',
      contrastText: '#fff',
    },
    text:{
      primary: '#fff',
      secondary: '#A197AA',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      default: '#120C18',
      paper:'rgb(42,38,48)'
    },
  },
  spacing: 10,

})

export default ForartTheme
