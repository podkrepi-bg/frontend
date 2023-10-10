import CookieConsent from 'react-cookie-consent'
import SubmitButton from './form/SubmitButton'

type CookieConsentPopupProps = {
  handleAcceptCookie: () => void
  handleDeclineCookie: () => void
}

const CookieConsentPopup = ({
  handleAcceptCookie,
  handleDeclineCookie,
}: CookieConsentPopupProps) => {
  return (
    <CookieConsent
      enableDeclineButton
      // cookieName="PodkrepiConsent"
      onAccept={handleAcceptCookie}
      onDecline={handleDeclineCookie}
      buttonText={<SubmitButton label="I understand" />}
      declineButtonText={<SubmitButton label="Decline" color="error" />}
      style={{ paddingRight: '30px' }}
      buttonStyle={{ background: 'transparent' }}
      declineButtonStyle={{ background: 'transparent' }}>
      text for cookies
    </CookieConsent>
  )
}

export default CookieConsentPopup
