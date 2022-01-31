import React, { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import { Grid, IconButton, Menu, Typography } from '@mui/material'

import LinkMenuItem from 'components/common/LinkMenuItem'

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Grid item>
      <IconButton onClick={handleMenu} size="large">
        <AccountCircle color="info" />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <LinkMenuItem href="#">
          <Typography variant="button">Option 1</Typography>
        </LinkMenuItem>
        <LinkMenuItem href="#">
          <Typography variant="button">Option 2</Typography>
        </LinkMenuItem>
        <LinkMenuItem href="#">
          <Typography variant="button">Option 3</Typography>
        </LinkMenuItem>
      </Menu>
    </Grid>
  )
}
