import { styled } from '@mui/system'
import { Grid } from '@mui/material'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  marginBottom: theme.spacing(12),
}))

export const IconsWrapper = styled(Grid)(() => ({
  marginBottom: theme.spacing(5),
}))

export const Checked = styled(Grid)(() => ({
  display: 'flex',
  marginBottom: theme.spacing(1.5),
  marginRight: theme.spacing(2),
  '& span': {
    marginLeft: theme.spacing(1.5),
  },
}))

export const List = styled(Grid)(() => ({
  padding: theme.spacing(1),
  marginRight: theme.spacing(1),
  justifyContent: 'space-between',
  '& span': {
    textAlign: 'start',
  },
}))
