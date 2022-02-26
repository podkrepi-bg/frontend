import React from 'react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
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

export default function ProjectMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <GenericMenu label={t('nav.about.about-project')}>
      {navItems.map(({ href, label }, key) => (
        <LinkMenuItem href={href} selected={router.asPath === href} key={key}>
          <Typography variant="button">{t(label)}</Typography>
        </LinkMenuItem>
      ))}
    </GenericMenu>
  )
}
