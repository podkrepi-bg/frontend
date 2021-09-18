import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import { IconButton, IconButtonProps } from '@material-ui/core'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = IconButtonProps & Pick<LinkProps, 'href' | 'as' | 'prefetch'>

const NextLink = ({ href, as, prefetch, ...props }: LinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <IconButton buttonRef={ref} {...props} />
  </Link>
)

export default forwardRef<LinkRef, NextLinkProps>(NextLink)
