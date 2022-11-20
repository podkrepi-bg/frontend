import React from 'react'
import { MenuItem, MenuItemProps } from '@mui/material'
import theme from 'common/theme'

export default function ExternalLinkMenuItem({
  href,
  target,
  ...props
}: MenuItemProps & Pick<HTMLAnchorElement, 'href' | 'target'>) {
  return (
    <a style={{ color: theme.palette.text.primary }} href={href} target={target}>
      <MenuItem {...props} />
    </a>
  )
}
