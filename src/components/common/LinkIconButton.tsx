import React, { forwardRef, Ref } from 'react'
import Link, { LinkProps } from 'next/link'
import { IconButton, IconButtonProps } from '@mui/material'

export type LinkRef = HTMLButtonElement
export type NextLinkProps = IconButtonProps & Pick<LinkProps, 'href' | 'as' | 'prefetch'>

const LinkIconButton = ({ href, as, prefetch, ...props }: NextLinkProps, ref: Ref<LinkRef>) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <IconButton ref={ref} {...props} size="large" />
  </Link>
)

export default forwardRef(LinkIconButton)
