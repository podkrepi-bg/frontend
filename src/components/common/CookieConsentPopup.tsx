import CookieConsent from 'react-cookie-consent'
import { useTranslation } from 'react-i18next'

type CookieConsentPopupProps = {
  handleAcceptCookie: () => void
  handleDeclineCookie: () => void
}

const CookieConsentPopup = ({
  handleAcceptCookie,
  handleDeclineCookie,
}: CookieConsentPopupProps) => {
  const { t } = useTranslation()

  return (
    <CookieConsent
      enableDeclineButton
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      buttonText={t('cookieConsentButton')}
      declineButtonText={t('cookieRejectButton')}
      style={{ border: '1px solid black', backgroundColor: '#fff' }}
      contentStyle={{
        fontSize: '1rem',
        color: '#000',
        padding: '0.5rem',
      }}
      buttonStyle={{
        backgroundColor: 'white',
        color: '#32a9fe',
        border: '1px solid #32a9fe',
        borderRadius: '5px',
      }}
      declineButtonStyle={{
        backgroundColor: 'white',
        color: '#32a9fe',
        border: '1px solid #32a9fe',
        borderRadius: '5px',
      }}>
      {t('cookieConsent')}
    </CookieConsent>
  )
}

export default CookieConsentPopup
