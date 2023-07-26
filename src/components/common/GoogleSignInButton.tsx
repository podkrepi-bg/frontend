import Google from 'common/icons/Google'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

const onGoogleLogin = () => {
  const url = `/google-signin`
  const POPUP_WIDTH = 500
  const POPUP_HEIGHT = 550
  const y = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2
  const x = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2

  const newWindow = window.open(
    url,
    '_blank',
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT} top=${y} left=${x} popup`,
  )
  newWindow?.focus()
}

export default function GoogleSignInButton({ ...props }) {
  const { t } = useTranslation()

  return (
    <Button variant="outlined" fullWidth onClick={onGoogleLogin} {...props}>
      <Google /> {t('nav.login-with')} Google
    </Button>
  )
}
