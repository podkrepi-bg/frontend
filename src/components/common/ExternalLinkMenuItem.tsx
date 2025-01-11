import React from 'react'
import { MenuItem, MenuItemProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}))
export default function ExternalLinkMenuItem({
  href,
  target,
  ...props
}: MenuItemProps & Pick<HTMLAnchorElement, 'href' | 'target'>) {
  return (
    <StyledLink href={href} target={target}>
      <MenuItem {...props} />
    </StyledLink>
  )
}
