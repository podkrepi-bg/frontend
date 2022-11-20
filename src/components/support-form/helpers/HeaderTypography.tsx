import { Typography } from '@mui/material'
import { lighten } from '@mui/material/styles'
import { ReactNode } from 'react'

export default function HeaderTypography({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="h4"
      align="center"
      sx={(theme) => ({
        mt: 10,
        color: lighten(theme.palette.primary.dark, 0.1),
        width: '100%',
      })}>
      {children}
    </Typography>
  )
}
