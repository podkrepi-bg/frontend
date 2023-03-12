import React, { useState } from 'react'
import { styled, lighten } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, Button, Menu, Typography } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import { useSession } from 'next-auth/react'

const PREFIX = 'PublicMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
  dropdownArrowIcon: `${PREFIX}-dropdownArrowIcon`,
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

  [`& .${classes.dropdownArrowIcon}`]: {
    marginLeft: '2px',
  },
}))

export default function PublicMenu() {
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  if (session) {
    return null
  }

  return (
    <StyledGrid item>
      <Button
        onClick={handleMenu}
        size="medium"
        color="inherit"
        classes={{ endIcon: classes.dropdownArrowIcon }}
        endIcon={
          open ? <ArrowDropUpIcon color="primary" /> : <ArrowDropDownIcon color="primary" />
        }>
        <PersonIcon />
      </Button>
      <Menu
        disableScrollLock={true}
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
