import { useRouter } from 'next/router'

import { Typography } from '@mui/material'

import LinkMenuItem from 'components/common/LinkMenuItem'
import GenericMenu from './GenericMenu'
import { useTranslation } from 'next-i18next'

export default function CountryMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <GenericMenu label={t('nav.bootcamp.index')}>
      <LinkMenuItem href="/bootcamp/create" selected={router.asPath === '/bootcamp/create'}>
        <Typography>{t('nav.bootcamp.create')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem href="/bootcamp" selected={router.asPath === '/bootcamp'}>
        <Typography>{t('nav.bootcamp.list')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem href="/bootcamp/students" selected={router.asPath === '/bootcamp/students'}>
        <Typography>{t('nav.bootcamp.students')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem href="/bootcamp/animals" selected={router.asPath === '/bootcamp/animals'}>
        <Typography>{t('nav.bootcamp.animals')}</Typography>
      </LinkMenuItem>
    </GenericMenu>
  )
}
