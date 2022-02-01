import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

export default function DonationMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <GenericMenu label={t('nav.donation-menu')}>
      <Link href={routes.campaigns.index} passHref>
        <MenuItem component="a" selected={router.asPath === routes.campaigns.index}>
          <Typography variant="button">{t('nav.campaigns.index')}</Typography>
        </MenuItem>
      </Link>
      <LinkMenuItem
        href={routes.campaigns.create}
        selected={router.asPath.startsWith(routes.campaigns.create)}>
        <Typography variant="button">{t('nav.campaigns.create')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem
        href={routes.termsOfService}
        selected={router.asPath.startsWith(routes.termsOfService)}>
        <Typography variant="button">{t('components.footer.terms-of-service')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem href={routes.faq} selected={router.asPath.startsWith(routes.faq)}>
        <Typography variant="button">{t('nav.faq')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem
        href={routes.bootcamps.index}
        selected={router.asPath.startsWith(routes.bootcamps.index)}>
        <Typography variant="button">{t('Бууткемп')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem
        href={routes.bootcamps.home}
        selected={router.asPath.startsWith(routes.bootcamps.home)}>
        <Typography variant="button">{t('Бууткемп-грид')}</Typography>
      </LinkMenuItem>
    </GenericMenu>
  )
}
