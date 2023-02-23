import React, { useState } from 'react'
import { Button, Menu } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type Props = {
  id: string
  label: string
  children: React.ReactNode
}

export default function GenericNavMenu({ id, label, children }: Props) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        onClick={handleMenu}
        sx={{ whiteSpace: 'nowrap', px: 2 }}
        endIcon={
          open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />
        }>
        {label}
      </Button>
      <Menu
        keepMounted
        disableScrollLock
        id={`main-nav-menu--${id}`}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        elevation={6}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1 } }}>
        {children}
      </Menu>
    </>
  )
}
