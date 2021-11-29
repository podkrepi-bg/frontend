import React from 'react'
import { Button, ButtonProps, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes, staticUrls } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import DonationMenu from './DonationMenu'

type NavItem = {
  href: string
  label: string
  variant: ButtonProps['variant']
  target?: string
  enabled?: boolean
}

const allNavItems: NavItem[] = [
  {
    href: routes.about,
    label: 'nav.about',
    variant: 'text',
  },
  {
    href: routes.aboutProject,
    label: 'nav.about-project',
    variant: 'text',
  },
  {
    href: routes.contact,
    label: 'nav.contacts',
    variant: 'text',
  },
  {
    href: routes.support,
    label: 'nav.support-us',
    variant: 'outlined',
  },
]
export const navItems = allNavItems.filter((el) => typeof el.enabled === 'undefined' ?? el.enabled)

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="baseline" spacing={2}>
      {navItems.map(({ href, label, variant }, key) => (
        <Grid item key={key}>
          <LinkButton
            href={href}
            color="primary"
            style={{ whiteSpace: 'nowrap' }}
            variant={variant}>
            {t(label)}
          </LinkButton>
        </Grid>
      ))}
      <Grid item>
        <DonationMenu />
      </Grid>
      <Grid item>
        <Button
          variant="text"
          target="_blank"
          color="primary"
          href={staticUrls.blog}
          style={{ whiteSpace: 'nowrap' }}>
          {t('nav.blog')}
        </Button>
      </Grid>
      {children}
    </Grid>
  )
}
