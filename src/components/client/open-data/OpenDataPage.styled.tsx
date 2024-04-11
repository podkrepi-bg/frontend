import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import theme from 'common/theme'

export const Text = styled(Typography)(() => ({
  margin: theme.spacing(3, 0),
}))

export const UnorderedList = styled('ul')(() => ({
  listStyleType: 'disc',
  margin: theme.spacing(0, 5),
}))

export const ListItem = styled('li')(() => ({
  margin: theme.spacing(1, 0),
}))
