import { pink } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

// https://material-ui.com/customization/default-theme/#default-theme
const theme = createMuiTheme({
  palette: {
    type: 'light',
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    primary: {
      main: '#F19F25',
    },
    secondary: pink,
  },
  shape: {
    borderRadius: 6,
  },
})
export default responsiveFontSizes(theme)
