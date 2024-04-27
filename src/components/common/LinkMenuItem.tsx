import React from 'react'
import Link, { LinkProps } from 'next/link'
import { MenuItem, MenuItemProps } from '@mui/material'

export type LinkRef = HTMLAnchorElement
export type NextLinkProps = MenuItemProps & Pick<LinkProps, 'href' | 'as' | 'prefetch' | 'locale'>
export default function LinkMenuItem({
  href,
  as,
  prefetch,
  locale,
  children,
  ...props
}: NextLinkProps) {
  return (
    <MenuItem {...props} component="li">
      <Link
        href={href}
        as={as}
        role="menuitem"
        prefetch={prefetch}
        locale={locale}
        style={{ textDecoration: 'none', color: 'black' }}>
        {children}
      </Link>
    </MenuItem>
  )
}
