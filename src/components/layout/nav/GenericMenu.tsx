import React, { useState } from 'react'
import { Button, Menu } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type Props = {
  label: string
  children: React.ReactNode
}

export default function GenericMenu({ label, children }: Props) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        variant="text"
        color="primary"
        onClick={handleMenu}
        sx={{ whiteSpace: 'nowrap', px: 2 }}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}>
        {label}
      </Button>
      <Menu
        keepMounted
        id="menu-donation"
        anchorEl={anchorEl}
        elevation={6}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {children}
      </Menu>
    </>
  )
}
