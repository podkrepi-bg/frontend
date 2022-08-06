import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, IconButton, Menu, Typography, lighten, Avatar } from '@mui/material'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import theme from 'common/theme'
import { useSession } from 'next-auth/react'

const PREFIX = 'PublicMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.dropdownLinkButton}`]: {
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
  },

  [`& .${classes.dropdownLinkText}`]: {
    color: theme.palette.primary.dark,
    width: '100%',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export default function PublicMenu() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (session) {
    return null
  }

  return (
    <StyledGrid item>
      <IconButton onClick={handleMenu} size="large" color="inherit">
        <PersonIcon />
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
    </StyledGrid>
  )
}
