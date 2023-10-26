import { LinkProps, Link as MuiLink } from '@mui/material'
import NextLink from 'next/link'

export default function Link(props: LinkProps<'a'>) {
  return <MuiLink component={NextLink} {...props} />
}
