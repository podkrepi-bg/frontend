import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { AccountCircle } from '@mui/icons-material'
import { Grid, IconButton, Menu, Typography, Theme, lighten } from '@mui/material'

import { routes } from 'common/routes'
import { useSession } from 'common/util/useSession'
import LinkMenuItem from 'components/common/LinkMenuItem'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

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

export default function PublicMenu() {
  const { t } = useTranslation()
  const { session } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const classes = useStyles()

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
        <LinkMenuItem href={routes.login} className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t('nav.login')}
          </Typography>
        </LinkMenuItem>
        <LinkMenuItem href={routes.register} className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t('nav.register')}
          </Typography>
        </LinkMenuItem>
      </Menu>
    </Grid>
  )
}
