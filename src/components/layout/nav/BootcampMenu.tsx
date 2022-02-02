import { useRouter } from 'next/router'

import { Typography } from '@mui/material'

import LinkMenuItem from 'components/common/LinkMenuItem'
import GenericMenu from './GenericMenu'
import { useTranslation } from 'next-i18next'

export default function BootcampMenu() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <GenericMenu label={t('nav.bootcamp.index')}>
      <LinkMenuItem href="/bootcamp/dashboard" selected={router.asPath === '/bootcamp/dashboard'}>
        <Typography>{t('nav.bootcamp.students')}</Typography>
      </LinkMenuItem>
      <LinkMenuItem
        href="/bootcamp/dashboard/pets"
        selected={router.asPath === '/bootcamp/dashboard/pets'}>
        <Typography>{t('nav.bootcamp.pets.index')}</Typography>
      </LinkMenuItem>
    </GenericMenu>
  )
}
