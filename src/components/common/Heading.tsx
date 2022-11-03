import { PropsWithChildren } from 'react'

import { styled } from '@mui/material/styles'
import { Typography, TypographyProps } from '@mui/material'

const Root = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  textAlign: 'center',
  fontWeight: 500,
  marginBottom: theme.spacing(6),
}))

type HeadingParams = PropsWithChildren<TypographyProps> & {
  component?: React.ElementType
}

export default function Heading({ children, ...props }: HeadingParams) {
  return <Root {...props}>{children}</Root>
}
