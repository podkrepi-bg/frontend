import React from 'react'
import Link, { LinkProps } from 'next/link'
import { MenuItem, MenuItemProps } from '@mui/material'
import theme from 'common/theme'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = MenuItemProps & Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>
export default function LinkMenuItem({ href, as, prefetch, locale, ...props }: NextLinkProps) {
  return (
    <Link
      as={as}
      passHref
      href={href}
      prefetch={prefetch}
      locale={locale}
      style={{ color: theme.palette.text.primary }}>
      <MenuItem {...props} />
    </Link>
  )
}
