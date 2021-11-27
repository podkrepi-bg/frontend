import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Avatar, Grid, IconButton, Menu, MenuItem } from '@mui/material'

import { routes } from 'common/routes'

export default function PrivateMenu() {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: session, status } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const goto = (url: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    setAnchorEl(null)
    router.push(url)
  }

  if (status !== 'authenticated' || !session) {
    return null
  }

  const title = `${session?.user?.name}\n(${session?.user?.email})`
  return (
    <Grid item>
      <IconButton onClick={handleMenu} size="large">
        {session?.user?.image ? (
          <Avatar title={title} alt={title} src={session.user.image} />
        ) : (
          <Avatar title={title} alt={title}>
            <AccountCircle />
          </Avatar>
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
