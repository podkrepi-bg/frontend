import React, { useState } from 'react'
import { Button, Menu, MenuProps } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { styled } from '@mui/styles'

type Props = {
  label: string
  children: React.ReactNode
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={6}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    marginTop: theme.spacing(1),
  },
}))

export default function GenericMenu({ label, children }: Props) {
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
      <StyledMenu
        disableScrollLock={true}
        keepMounted
        id="menu-donation"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}>
        {children}
      </StyledMenu>
    </>
  )
}
