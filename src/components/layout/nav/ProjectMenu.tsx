import React from 'react'
import { useRouter } from 'next/router'
import { Theme, Typography, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

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
    href: routes.support,
    label: 'nav.about.support-us',
  },
  {
    href: routes.contact,
    label: 'nav.about.contacts',
  },
]

export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

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

export default function ProjectMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  return (
    <GenericMenu label={t('nav.about.about-project')}>
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
    </GenericMenu>
  )
}
