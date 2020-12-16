import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = Omit<MuiLinkProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>

const NextLink = ({ href, as, prefetch, ...props }: LinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <MuiLink ref={ref} {...props} />
  </Link>
)

export default forwardRef<LinkRef, NextLinkProps>(NextLink)
