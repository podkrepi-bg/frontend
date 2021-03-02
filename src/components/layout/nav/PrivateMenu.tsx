import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useTranslation } from 'react-i18next'
import { AccountCircle } from '@material-ui/icons'
import { Avatar, Grid, IconButton, Menu, MenuItem } from '@material-ui/core'

import { routes } from 'common/routes'

export default function PrivateMenu() {
  const router = useRouter()
  const { t } = useTranslation()
  const [session] = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const goto = (url: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    setAnchorEl(null)
    router.push(url)
  }

  if (!session) {
    return null
  }

  const title = `${session.user.name}\n(${session.user.email})`
  return (
    <Grid item>
      <IconButton onClick={handleMenu}>
        {session.user.image ? (
          <Avatar title={title} alt={title} src={session.user.image} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem href={routes.profile} component="a" onClick={goto(routes.profile)}>
          {t('nav.profile')}
        </MenuItem>
        <MenuItem href={routes.logout} component="a" onClick={goto(routes.logout)}>
          {t('nav.logout')}
        </MenuItem>
      </Menu>
    </Grid>
  )
}
