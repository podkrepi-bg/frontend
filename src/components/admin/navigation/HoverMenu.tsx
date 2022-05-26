import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles'
import React, { useState, useMemo } from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'

import CustomListItem from './CustomListItem'

const PREFIX = 'HoverMenu'

const classes = {
  open: `${PREFIX}-open`,
  close: `${PREFIX}-close`,
}

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.open}`]: {
    marginTop: '25px',
    marginLeft: '155px',
  },
  [`& .${classes.close}`]: {
    marginTop: '45px',
    marginLeft: '45px',
  },
})

type Props = {
  isOpen: boolean
  menu: string
  items: Submenu[]
  icon: React.ElementType
}
type Submenu = {
  label: string
  icon: React.ElementType
  href: string
}
export default function HoverMenu({ menu, items, icon: Icon, isOpen }: Props) {
  const router = useRouter()

  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null)

  const isSelected = useMemo(
    () => items.filter((item) => item.href !== '#' && router.asPath.includes(item.href)).length > 0,
    [items],
  )
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget)
  }
  const handleCloseMenu = () => setAnchorMenu(null)

  return (
    <Root>
      <ListItemButton
        selected={isSelected}
        onClick={handleOpenMenu}
        sx={{ borderRadius: '0 25px 25px 0' }}>
        <ListItemIcon
          title={menu}
          sx={(theme) => ({
            minWidth: theme.spacing(4),
            color: isSelected ? theme.palette.primary.main : theme.palette.action.active,
          })}>
          {<Icon />}
        </ListItemIcon>
        {isOpen && (
          <ListItemText
            primary={menu}
            primaryTypographyProps={{ color: isSelected ? 'primary' : undefined }}
          />
        )}
        {isOpen && (
          <ChevronRightIcon
            color={
              anchorMenu ? (isSelected ? 'primary' : 'action') : isSelected ? 'primary' : 'disabled'
            }
          />
        )}
      </ListItemButton>
      <Menu
        keepMounted
        id="menu-appbar"
        anchorEl={anchorMenu}
        onClose={handleCloseMenu}
        open={Boolean(anchorMenu)}
        className={isOpen ? classes.open : classes.close}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}>
        {items.map(({ label, icon: Icon, href }) => (
          <CustomListItem
            key={label}
            sx={{ p: 0 }}
            selected={href !== '#' && router.asPath.includes(href)}
            icon={<Icon />}
            label={label}
            onClick={() => router.push(href)}
          />
        ))}
      </Menu>
    </Root>
  )
}
