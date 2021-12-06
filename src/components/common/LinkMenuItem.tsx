import React from 'react'
import Link, { LinkProps } from 'next/link'
import { MenuItem, MenuItemProps } from '@mui/material'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = MenuItemProps<'a'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>

export default function LinkMenuItem({ href, as, prefetch, locale, ...props }: NextLinkProps) {
  return (
    <Link as={as} passHref href={href} prefetch={prefetch} locale={locale}>
      <MenuItem component="a" {...props} />
    </Link>
  )
}
