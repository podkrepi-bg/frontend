import React from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes, staticUrls } from 'common/routes'
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
  target?: string
}

const allNavItems: NavItem[] = [
  {
    href: routes.about,
    label: 'nav.about.who-are-we',
  },
  {
    href: routes.aboutProject,
    label: 'nav.about.about-project',
  },
  {
    href: staticUrls.blog,
    label: 'nav.blog',
    target: '_blank',
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
  {
    href: routes.termsOfService,
    label: 'components.footer.terms-of-service',
  },
  {
    href: routes.faq,
    label: 'nav.campaigns.faq',
  },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function ProjectMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <StyledGenericMenu label={t('nav.about.about-us')}>
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
