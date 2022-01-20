import { Typography, TypographyProps } from '@mui/material'
import React, { PropsWithChildren } from 'react'
import theme from 'common/theme'

type Props = PropsWithChildren<TypographyProps>

const ContentTypography = ({ children, ...props }: Props) => {
  return (
    <Typography
      sx={{ color: theme.palette.text.secondary }}
      variant="subtitle1"
      component="span"
      {...props}>
      {children}
    </Typography>
  )
}

export default ContentTypography
