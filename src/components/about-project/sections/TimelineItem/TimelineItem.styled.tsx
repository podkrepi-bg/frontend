import { styled } from '@mui/system'
import { TimelineConnector } from '@mui/lab'
import { Icon } from '@mui/material'

import theme from 'common/theme'

export const Connector = styled(TimelineConnector)(() => ({
  height: theme.spacing(10),
}))

// export const TimelineIcon = styled(Icon)(() => ({
//   fontSize: theme.typography.pxToRem(40),
//   padding: '.5rem',
//   boxSizing: 'content-box',
// }))
