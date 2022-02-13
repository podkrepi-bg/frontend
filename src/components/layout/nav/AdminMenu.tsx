import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { MenuItem, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import LinkMenuItem from 'components/common/LinkMenuItem'

import GenericMenu from './GenericMenu'

export default function AdminMenu() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <GenericMenu label={t('nav.admin.index')}>
      <Link href={routes.admin.index} passHref>
        <MenuItem component="a" selected={router.asPath === routes.admin.index}>
          <Typography variant="button">{t('nav.admin.index')}</Typography>
        </MenuItem>
      </Link>
      <LinkMenuItem
        href={routes.admin.infoRequests}
        selected={router.asPath.startsWith(routes.admin.infoRequests)}>
        <Typography variant="button">{t('nav.admin.info-requests')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem
        href={routes.admin.supporters}
        selected={router.asPath.startsWith(routes.admin.supporters)}>
        <Typography variant="button">{t('nav.admin.supporters')}</Typography>
      </LinkMenuItem>
    </GenericMenu>
  )
}
