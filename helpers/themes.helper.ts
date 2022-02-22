import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
  },
})

export {
  defaultTheme
}