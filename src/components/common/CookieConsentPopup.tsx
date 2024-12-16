import CookieConsent from 'react-cookie-consent'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'

type CookieConsentPopupProps = {
  handleAcceptCookie: () => void
  handleDeclineCookie: () => void
}

const CookieConsentPopup = ({
  handleAcceptCookie,
  handleDeclineCookie,
}: CookieConsentPopupProps) => {
  const { t } = useTranslation()

  const containerStyle = {
    backgroundColor: '#EAF4FC',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: theme.spacing(2.5),
    gap: theme.spacing(2.5),
  }

  const contentStyle = {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.common.black,
    padding: theme.spacing(0, 2),
    margin: 0,
    maxWidth: theme.spacing(132.5),
  }

  const buttonStyle = {
    color: theme.palette.primary.main,
    borderRadius: theme.borders.semiRound,
    padding: theme.spacing(1.125, 1.5),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(0, 3.75),
  }
  
  const declineBtnStyle = {
    color: theme.palette.primary.main,
    borderRadius: theme.borders.semiRound,
    padding: theme.spacing(1, 1.5),
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.main}`,
    margin: theme.spacing(0, 3.75, 0, 0),
  }

  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      buttonText={t('cookieConsentButton')}
      declineButtonText={t('cookieRejectButton')}
      style={containerStyle}
      contentStyle={contentStyle}
      buttonStyle={buttonStyle}
      declineButtonStyle={declineBtnStyle}>
      {t('cookieConsent')}
    </CookieConsent>
  )
}

export default CookieConsentPopup
