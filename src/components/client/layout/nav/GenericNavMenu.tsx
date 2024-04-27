import React, { useState } from 'react'
import { Button, IconButton, Menu, lighten, styled } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

type Props = {
  id: string
  label: string | React.ReactElement
  children: React.ReactNode
}

type GenericNavMenuProps = Props &
  ({ buttonType: 'label' } | { buttonType: 'icon'; icon: React.ReactElement })

const PREFIX = 'nav--item'
const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}
function GenericNavMenu({ id, children, label, ...props }: GenericNavMenuProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      {props.buttonType === 'label' ? (
        <Button
          variant="text"
          color="inherit"
          aria-haspopup={true}
          aria-controls={`main-nav-menu--${id}`}
          aria-expanded={Boolean(anchorEl)}
          id={'menu-button'}
          onClick={handleMenu}
          sx={{ whiteSpace: 'nowrap', px: 2 }}
          endIcon={
            open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />
          }>
          {label}
        </Button>
      ) : props.buttonType === 'icon' ? (
        <IconButton
          color="inherit"
          aria-haspopup={true}
          aria-controls={`main-nav-menu--${id}`}
          aria-expanded={Boolean(anchorEl)}
          id={'menu-button'}
          onClick={handleMenu}>
          {props.icon}
        </IconButton>
      ) : null}
      <Menu
        keepMounted
        disableScrollLock
        aria-labelledby="menu-button"
        id={`main-nav-menu--${id}`}
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        elevation={6}
        onKeyDown={(e) => {
          const targetElement = e.nativeEvent.target as HTMLElement
          const firstChild = targetElement.firstChild as HTMLAnchorElement
          if (e.key === 'Enter' && firstChild) {
            firstChild.click()
          }
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1 } } }}>
        {children}
      </Menu>
    </>
  )
}

const StyledGenericNavMenu = styled(GenericNavMenu)(({ theme }) => ({
  [`& .${classes.dropdownLinkButton}`]: {
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 1),
    },
    '&.Mui-focusVisible': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
  },

  [`& .${classes.dropdownLinkText}`]: {
    width: '100%',
  },
}))

export default StyledGenericNavMenu
