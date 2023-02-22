import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

export default function LocaleButton() {
  const router = useRouter()
  const { t } = useTranslation()
  const changeLang = useCallback(
    (locale: string) => (event: React.MouseEvent) => {
      event.preventDefault()
      // Same route different language
      router.push(router.asPath, router.asPath, { locale })
    },
    [router.asPath],
  )
  if (!router.locale) {
    return null
  }

  if (router.locale === 'bg') {
    return (
      <Button variant="text" color="inherit" size="small" onClick={changeLang('en')}>
        {t('EN')}
      </Button>
    )
  }

  return (
    <Button variant="text" color="inherit" size="small" onClick={changeLang('bg')}>
      {t('BG')}
    </Button>
  )
}
