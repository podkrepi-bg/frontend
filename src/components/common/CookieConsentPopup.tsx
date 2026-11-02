import CookieConsent from 'react-cookie-consent'
import { useTranslation } from 'next-i18next'
import type { CSSProperties } from 'react'

import theme from 'common/theme'

type CookieConsentPopupProps = {
  handleAcceptCookie: () => void
  handleDeclineCookie: () => void
  styleOverride?: CSSProperties
}

const CookieConsentPopup = ({
  handleAcceptCookie,
  handleDeclineCookie,
  styleOverride,
}: CookieConsentPopupProps) => {
  const { t } = useTranslation()

  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      buttonText={t('cookieConsentButton')}
      declineButtonText={t('cookieRejectButton')}
      style={{
        backgroundColor: '#EAF4FC',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: theme.spacing(2.5),
        gap: theme.spacing(2.5),
        ...styleOverride,
      }}
      contentStyle={{
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.common.black,
        padding: theme.spacing(0, 2),
        margin: 0,
        maxWidth: theme.spacing(132.5),
      }}
      buttonStyle={{
        color: theme.palette.primary.main,
        borderRadius: theme.borders.semiRound,
        padding: theme.spacing(1.125, 1.5),
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
        margin: theme.spacing(0, 3.75),
      }}
      declineButtonStyle={{
        color: theme.palette.primary.main,
        borderRadius: theme.borders.semiRound,
        padding: theme.spacing(1, 1.5),
        backgroundColor: theme.palette.common.white,
        border: `1px solid ${theme.palette.primary.main}`,
        margin: theme.spacing(0, 3.75, 0, 0),
      }}>
      {t('cookieConsent')}
    </CookieConsent>
  )
}

export default CookieConsentPopup
