import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'

import theme from 'common/theme'

export const Root = styled('section')(() => ({
  margin: theme.spacing(5, 0),
}))

export const CategoryWrapper = styled(Grid)(() => ({
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  '&:nth-of-type(3)': {
    marginBottom: 0,
  },
}))

export const CategoryTitle = styled(Typography)(() => ({
  fontWeight: 600,
}))

export const TechnologyItem = styled('li')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}))
