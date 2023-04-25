import {
  createTheme,
  darken,
  lighten,
  responsiveFontSizes,
  Theme,
  ThemeOptions,
} from '@mui/material/styles'

import { Montserrat } from '@next/font/google'

export const montserrat = Montserrat({
  display: 'auto',
  subsets: ['latin', 'cyrillic'],
})

const colors = {
  blue: {
    light: '#4AC3FF',
    main: '#32A9FE',
    mainDark: darken('#32A9FE', 0.2),
    dark: '#294E85',
  },
  yellow: {
    main: '#FFCB57',
    dark: '#F6992B',
  },
  gray: {
    main: '#F5F5F5',
    background: '#FAFAFA',
  },
  white: {
    main: '#ffffff',
  },
}

const borders = {
  dark: colors.blue.dark,
  light: colors.blue.main,
  round: '60px',
  semiRound: '20px',
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: colors.blue.light,
      main: colors.blue.main,
      dark: colors.blue.dark,
    },
    secondary: {
      main: colors.yellow.main,
      light: colors.gray.main,
    },
    background: {
      default: colors.white.main,
    },
    info: {
      main: colors.blue.dark,
      light: colors.blue.mainDark,
      dark: darken(colors.blue.dark, 0.2),
    },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          lineHeight: 2,
          borderRadius: '25px',
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        textPrimary: {
          color: colors.blue.dark,
          '&:hover': {
            color: colors.blue.mainDark,
          },
        },
        outlined: {
          backgroundColor: colors.white.main,
        },
        outlinedPrimary: {
          color: colors.blue.dark,
          '&:hover': {
            backgroundColor: lighten(colors.blue.main, 0.85),
          },
        },
        outlinedSecondary: {
          color: darken(colors.yellow.dark, 0.4),
          borderColor: colors.yellow.main,
          '&:hover': {
            backgroundColor: lighten(colors.yellow.main, 0.85),
            borderColor: darken(colors.yellow.main, 0.15),
          },
        },
        containedPrimary: {
          backgroundColor: colors.blue.main,
          '&:hover': {
            backgroundColor: darken(colors.blue.main, 0.15),
          },
        },
        containedSecondary: {
          backgroundColor: colors.yellow.main,
          '&:hover': {
            backgroundColor: darken(colors.yellow.main, 0.15),
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          borderRadius: borders.round,
        },
        multiline: {
          borderRadius: borders.semiRound,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: borders.round,
        },
        multiline: {
          borderRadius: borders.semiRound,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: borders.round,
        },
        multiline: {
          borderRadius: borders.semiRound,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          paddingLeft: 15,
          paddingRight: 15,
        },
      },
    },

    MuiMenuItem: {
      defaultProps: {
        sx: { py: 1.5 },
      },
    },
  },

  typography: {
    fontFamily: montserrat.style.fontFamily,
    h3: { color: colors.blue.dark },

    body1: {
      fontSize: '0.875rem',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
    },
    button: { textTransform: 'initial' },
  },
}

const theme: Theme = createTheme(themeOptions)
const materialTheme = responsiveFontSizes(theme)
const podkrepiTheme = {
  borders,
  ...materialTheme,
}

export default podkrepiTheme
