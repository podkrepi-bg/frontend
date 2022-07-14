import React from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

const PREFIX = 'AdminMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGenericMenu = styled(GenericMenu)(({ theme }) => ({
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

type NavItem = {
  href: string
  label: string
  target?: string
  enabled?: boolean
}

const allNavItems: NavItem[] = [
  {
    href: routes.admin.index,
    label: 'nav.admin.index',
  },
  {
    href: routes.admin.infoRequests,
    label: 'nav.admin.info-requests',
  },
  {
    href: routes.admin.supporters,
    label: 'nav.admin.supporters',
  },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function AdminMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <StyledGenericMenu label={t('nav.admin.index')}>
      {navItems.map(({ href, label, target }, key) => (
        <LinkMenuItem
          href={href}
          selected={router.asPath === href}
          key={key}
          target={target}
          className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t(label)}
          </Typography>
        </LinkMenuItem>
      ))}
    </StyledGenericMenu>
  )
}
