import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import ProgressBar from '@ramonak/react-progress-bar'

import theme from 'common/theme'

export const Root = styled(ProgressBar)(() => ({
//   position: 'relative',
}))

export const PercentNumber = styled('span')(() => ({
  position: 'absolute',
}))
