import theme from 'common/theme'
import Link from 'components/common/Link'

import { styled } from '@mui/material/styles'

export const Root = styled('section')(() => ({
  backgroundColor: theme.palette.secondary.light,
  padding: theme.spacing(10, 0, 15),
  marginTop: theme.spacing(12),
}))

export const PartnerLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  filter: 'grayscale(80%)',
  opacity: 0.8,

  '&:hover': {
    filter: 'grayscale(0)',
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
}))
