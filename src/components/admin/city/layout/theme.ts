import { createTheme, darken, responsiveFontSizes, ThemeOptions } from '@mui/material/styles'

const fontFamily = 'Montserrat'

const colors = {
  blue: {
    light: '#F3FDFF',
    main: '#32A9FE',
    mainDark: darken('#32A9FE', 0.2),
    dark: '#294E85',
  },
  yellow: {
    main: '#FFCB57',
  },
  gray: {
    main: '#F5F5F5',
    background: '#FAFAFA',
  },
  white: {
    main: '#ffffff',
  },
}

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: '#46dbf2',
      main: colors.blue.main,
      dark: '#294E85',
      contrastText: '#439CB3',
    },
    secondary: {
      main: colors.yellow.main,
      light: colors.gray.main,
    },
    background: {
      default: colors.white.main,
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    h1: { fontFamily },
    h2: { fontFamily },
    h3: { fontFamily, color: colors.blue.dark },
    h4: { fontFamily },
    h5: { fontFamily },
    h6: { fontFamily },
    button: { fontFamily, textTransform: 'initial' },
    body1: {
      fontSize: '0.875rem',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
    },
  },
}

const theme = createTheme(themeOptions)
export default responsiveFontSizes(theme)
