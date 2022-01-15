import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Grid, IconButton, Menu, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { useSession } from 'common/util/useSession'
import LinkMenuItem from 'components/common/LinkMenuItem'

export default function PrivateMenu() {
  const { t } = useTranslation()
  const { session } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <LinkMenuItem href={routes.login}>
          <Typography variant="button">{t('nav.login')}</Typography>
        </LinkMenuItem>
        <LinkMenuItem href={routes.register}>
          <Typography variant="button">{t('nav.register')}</Typography>
        </LinkMenuItem>
      </Menu>
    </Grid>
  )
}
