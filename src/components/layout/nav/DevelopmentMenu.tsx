import React from 'react'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Typography, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { staticUrls } from 'common/routes'

import GenericNavMenu from './GenericNavMenu'
import ExternalLinkMenuItem from 'components/common/ExternalLinkMenuItem'

const PREFIX = 'DevelopmentMenu'

const classes = {
  dropdownLinkButton: `${PREFIX}-dropdownLinkButton`,
  dropdownLinkText: `${PREFIX}-dropdownLinkText`,
}

const StyledGenericNavMenu = styled(GenericNavMenu)(({ theme }) => ({
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
    href: staticUrls.howToContribute,
    label: 'nav.dev.contribute',
    target: '_blank',
  },
  {
    href: staticUrls.projectDocs,
    label: 'nav.dev.project-docs',
    target: '_blank',
  },
  {
    href: staticUrls.github,
    label: 'nav.dev.open-source',
    target: '_blank',
  },
  // {
  //   href: routes.dev.openData,
  //   label: 'nav.dev.open-data',
  //   target: '_blank',
  // },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function DevelopmentMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <StyledGenericNavMenu id="menu-development" label={t('nav.dev.index')}>
      {navItems.map(({ href, label, target }, key) => (
        <ExternalLinkMenuItem
          selected={router.asPath === href}
          key={key}
          href={href}
          target={target || ''}
          className={classes.dropdownLinkButton}>
          <Typography variant="button" className={classes.dropdownLinkText}>
            {t(label)}
          </Typography>
        </ExternalLinkMenuItem>
      ))}
    </StyledGenericNavMenu>
  )
}
