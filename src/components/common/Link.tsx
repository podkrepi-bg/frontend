import { LinkProps, Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'
import { forwardRef } from 'react'

function Link(props: LinkProps<'a'>, ref: React.Ref<HTMLAnchorElement>) {
  return (
    <MuiLink
      component={NextLink}
      ref={ref}
      {...props}
      underline="none"
      sx={{ textDecoration: 'none' }}
    />
  )
}

export default forwardRef(Link)
