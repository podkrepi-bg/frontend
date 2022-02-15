import React from 'react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes, staticUrls } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

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
  {
    href: routes.bankaccounts.dev.openData,
    label: 'nav.dev.open-data',
    target: '_blank',
  },
]
export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function DevelopmentMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <GenericMenu label={t('nav.dev.index')}>
      {navItems.map(({ href, label, target }, key) => (
        <LinkMenuItem href={href} selected={router.asPath === href} key={key} target={target}>
          <Typography variant="button">{t(label)}</Typography>
        </LinkMenuItem>
      ))}
    </GenericMenu>
  )
}
