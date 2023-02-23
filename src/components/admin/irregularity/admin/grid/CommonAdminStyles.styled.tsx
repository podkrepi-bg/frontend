import { styled } from '@mui/material/styles'
import { Typography } from '@mui/material'

import theme from 'common/theme'
import FormTextField from 'components/common/form/FormTextField'

export const Heading = styled(Typography)(() => ({
  marginBottom: theme.spacing(5),
  color: theme.palette.primary.dark,
  textAlign: 'center',
}))

export const Content = styled(FormTextField)(() => ({
  '& textarea': { resize: 'vertical' },
}))
