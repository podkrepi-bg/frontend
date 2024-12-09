import { LinkProps } from '@mui/material'
import { PropsWithChildren } from 'react'
import Link from './Link'

type ExternalLinkParams = PropsWithChildren<LinkProps>

export default function ExternalLink({ children, ...props }: ExternalLinkParams) {
  return (
    <Link target="_blank" rel="noreferrer noopener" {...props} sx={{ textDecoration: 'none' }}>
      {children}
    </Link>
  )
}
