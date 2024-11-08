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
      const date = new Date()
      const expireMs = 100 * 365 * 24 * 60 * 60 * 1000 // 100 days
      date.setTime(date.getTime() + expireMs)
      document.cookie = `NEXT_LOCALE=${locale};expires=${date.toUTCString()};path=/`
      router.push({ pathname, query }, asPath, { locale })
    },
    [router.asPath, router.locale],
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
      onClick={changeLang(router.locale === 'bg' ? 'en' : 'bg')}
      sx={(theme) => ({
        [theme.breakpoints.down('md')]: {
          '&:hover': {
            color: 'rgb(40, 135, 203)',
            backgroundColor: 'transparent',
          },
        },
      })}>
      {t(router.locale === 'bg' ? 'EN' : 'BG')}
    </Button>
  )
}
