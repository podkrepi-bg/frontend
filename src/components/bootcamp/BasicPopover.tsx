import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, Popover } from '@mui/material'

type Props = {
  children: React.ReactNode
  title: string
  icon: React.ReactNode
}

export default function BasicPopover({ title, children, icon }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <ListItemButton aria-describedby={id} onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}>
        {children}
      </Popover>
    </>
  )
}
