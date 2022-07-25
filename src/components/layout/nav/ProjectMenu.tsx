import React from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

const PREFIX = 'ProjectMenu'

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
  enabled?: boolean
}

const allNavItems: NavItem[] = [
  {
    href: routes.aboutProject,
    label: 'nav.about.about-project',
  },
  {
    href: routes.about,
    label: 'nav.about.about-us',
  },
  {
    href: routes.support_us,
    label: 'nav.about.support_us',
  },
  {
    href: routes.support,
    label: 'nav.about.support-us',
  },
  {
    href: routes.reports,
    label: 'nav.about.reports',
  },
  {
    href: routes.contact,
    label: 'nav.about.contacts',
  },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function ProjectMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <StyledGenericMenu label={t('nav.about.about-project')}>
      {navItems.map(({ href, label }, key) => (
        <LinkMenuItem
          href={href}
          selected={router.asPath === href}
          key={key}
          className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t(label)}
          </Typography>
        </LinkMenuItem>
      ))}
    </StyledGenericMenu>
  )
}
