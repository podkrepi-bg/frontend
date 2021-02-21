import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { createMuiTheme, darken, responsiveFontSizes } from '@material-ui/core/styles'

const fontFamily = 'Poiret One'
const colors = {
  blue: {
    light: '#F3FDFF',
    main: '#4AC3FF',
    mainDark: darken('#4AC3FF', 0.2),
    dark: '#294E85',
  },
  yellow: {
    main: '#FFCB57',
  },
}
export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      light: colors.blue.light,
      main: colors.blue.main,
      dark: colors.blue.dark,
    },
    secondary: {
      main: colors.yellow.main,
    },
  },
  shape: {
    borderRadius: 3,
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        lineHeight: 2,
      },
      textPrimary: {
        '&:hover': {
          color: colors.blue.mainDark,
        },
      },
      outlined: {
        '&:hover': {
          backgroundColor: colors.blue.dark,
          color: colors.blue.light,
        },
      },
      outlinedPrimary: {
        '&:hover': {
          color: colors.blue.mainDark,
          borderColor: colors.blue.mainDark,
        },
      },
      containedPrimary: {
        backgroundColor: colors.blue.dark,
        color: colors.blue.light,
        '&:hover': {
          backgroundColor: darken(colors.blue.dark, 0.2),
        },
      },
    },
    MuiAppBar: {
      root: {
        paddingLeft: 15,
        paddingRight: 15,
      },
    },
  },
  typography: {
    h1: { fontFamily },
    h2: { fontFamily },
    h3: { fontFamily },
    h4: { fontFamily },
    h5: { fontFamily },
    h6: { fontFamily },
  },
}

// https://material-ui.com/customization/default-theme/#default-theme
const theme = createMuiTheme(themeOptions)
export default responsiveFontSizes(theme)
