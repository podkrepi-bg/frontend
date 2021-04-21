import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Button, Menu, MenuItem } from '@material-ui/core'

export default function LocaleMenu() {
  const router = useRouter()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: React.MouseEvent) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const changeLang = useCallback(
    (locale: string) => (event: React.MouseEvent) => {
      event.preventDefault()
      // Same route different language
      router.push(router.route, undefined, { locale })
      setAnchorEl(null)
    },
    [],
  )

  if (!router.locale) {
    return null
  }

  return (
    <>
      <Button variant="text" size="small" onClick={handleMenu}>
        {router.locale.toUpperCase()}
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        keepMounted
        id="menu-appbar"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem href={router.route} component="a" onClick={changeLang('bg')}>
          {t('BG')}
        </MenuItem>
        <MenuItem href={router.route} component="a" onClick={changeLang('en')}>
          {t('EN')}
        </MenuItem>
      </Menu>
    </>
  )
}
