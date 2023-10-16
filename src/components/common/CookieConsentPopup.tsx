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
      buttonWrapperClasses="consent_button-wrapper"
      containerClasses="consent_container"
      contentClasses="consent_content"
      buttonClasses="consent_button-accept"
      declineButtonClasses="consent_button-decline ">
      {t('cookieConsent')}
    </CookieConsent>
  )
}

export default CookieConsentPopup
