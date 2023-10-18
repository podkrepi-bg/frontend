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
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale })
    },
    [router.asPath],
  )
  if (!router.locale) {
    return null
  }

  return (
    <Button
      data-testid="locale-button"
      variant="text"
      color="inherit"
      size="small"
      onClick={changeLang(router.locale === 'bg' ? 'en' : 'bg')}>
      {t(router.locale === 'bg' ? 'EN' : 'BG')}
    </Button>
  )
}
