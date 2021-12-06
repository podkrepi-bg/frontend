import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Grid, IconButton, Menu, MenuItem } from '@mui/material'

import { routes } from 'common/routes'
import { useSession } from 'common/util/useSession'

export default function PrivateMenu() {
  const router = useRouter()
  const { t } = useTranslation()
  const { session } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const goto = (url: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    setAnchorEl(null)
    router.push(url)
  }

  if (session) {
    return null
  }

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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem href={routes.login} component="a" onClick={goto(routes.login)}>
          {t('nav.login')}
        </MenuItem>
        <MenuItem href={routes.register} component="a" onClick={goto(routes.register)}>
          {t('nav.register')}
        </MenuItem>
      </Menu>
    </Grid>
  )
}
