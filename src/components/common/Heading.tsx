import { PropsWithChildren } from 'react'

import { Typography, TypographyProps } from '@mui/material'

type HeadingParams = PropsWithChildren<TypographyProps> & {
  component?: React.ElementType
}

export default function Heading({ children, ...props }: HeadingParams) {
  return <Typography {...props}>{children}</Typography>
}
