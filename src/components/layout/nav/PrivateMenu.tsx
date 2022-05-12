import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Avatar, Grid, IconButton, lighten, Menu, Theme, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

import theme from 'common/theme'
import { routes } from 'common/routes'
import { isAdmin } from 'common/util/roles'
import LinkMenuItem from 'components/common/LinkMenuItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropdownLinkButton: {
      '&:hover': {
        backgroundColor: lighten(theme.palette.primary.main, 0.9),
      },
    },
    dropdownLinkText: {
      color: theme.palette.primary.dark,
      width: '100%',
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  }),
)

export default function PrivateMenu() {
  const { t } = useTranslation()
  const { data: session, status } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const classes = useStyles()

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (!session) {
    return null
  }

  const title = `${session.name}\n(${session.email})`
  return (
    <Grid item>
      <IconButton onClick={handleMenu} size="large">
        {session?.user?.picture ? (
          <Avatar title={title} alt={title} src={session?.user?.picture} />
        ) : (
          <AccountCircle sx={{ fill: theme.palette.info.light }} />
        )}
      </IconButton>
      <Menu
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <LinkMenuItem href={routes.profile.index} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.profile')}</Typography>
        </LinkMenuItem>
        {status === 'authenticated' && isAdmin(session) && (
          <LinkMenuItem href={routes.admin.index} className={classes.dropdownLinkText}>
            <Typography variant="button">{t('nav.admin.index')}</Typography>
          </LinkMenuItem>
        )}
        <LinkMenuItem href={routes.logout} className={classes.dropdownLinkText}>
          <Typography variant="button">{t('nav.logout')}</Typography>
        </LinkMenuItem>
      </Menu>
    </Grid>
  )
}
