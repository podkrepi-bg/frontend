import React from 'react'
import { useRouter } from 'next/router'
import { Typography, Theme, lighten } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

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

export default function DevelopmentMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()

  return (
    <GenericMenu label={t('nav.admin.index')}>
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
    </GenericMenu>
  )
}
