import React from 'react'
import { styled, lighten } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, Typography, GridProps } from '@mui/material'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import { useSession } from 'next-auth/react'
import GenericNavMenu from './GenericNavMenu'

const PREFIX = 'PublicMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
  dropdownArrowIcon: `${PREFIX}-dropdownArrowIcon`,
}

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
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

  if (session) {
    return null
  }

  return (
    <StyledGrid item component={'li'}>
      <GenericNavMenu id={'menu-authentication'} buttonType="label" label={<PersonIcon />}>
        <LinkMenuItem href={routes.login}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t('nav.login')}
          </Typography>
        </LinkMenuItem>
        <LinkMenuItem href={routes.register}>
          <Typography variant="button">{t('nav.register')}</Typography>
        </LinkMenuItem>
      </GenericNavMenu>
    </StyledGrid>
  )
}
