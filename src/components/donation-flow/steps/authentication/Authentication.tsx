import { useEffect, useState } from 'react'
import { Box, Typography, Alert, useMediaQuery } from '@mui/material'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'

import { DonationFormAuthState, DonationFormData } from 'components/donation-flow/helpers/types'
import theme from 'common/theme'
import EmailField from 'components/common/form/EmailField'

import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'
import { AuthenticateAlertContent } from 'components/donation-flow/alerts/AlertsContent'

export default function Authentication({
  sectionRef,
}: {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const { data: session } = useSession()
  const {
    values: { authentication },
    setFieldValue,
  } = useFormikContext<DonationFormData>()

  useEffect(() => {
    if (session?.user) {
      setFieldValue('authentication', DonationFormAuthState.AUTHENTICATED)
    }
  }, [session?.user])

  const [showAuthAlert, setShowAuthAlert] = useState(true)
  const [showNoRegisterAlert, setShowNoRegisterAlert] = useState(true)

  const isSmall = useMediaQuery(theme.breakpoints.down('md'))

  const options = [
    {
      value: DonationFormAuthState.LOGIN,
      label: 'Login',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          {isSmall && showAuthAlert ? (
            <Alert
              onClose={() => {
                setShowAuthAlert(false)
              }}
              color="info"
              icon={false}
              sx={{ mx: -2 }}>
              <AuthenticateAlertContent />
            </Alert>
          ) : null}
          <InlineLoginForm />
        </Box>
      ),
    },
    {
      value: DonationFormAuthState.REGISTER,
      label: 'Register',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          {isSmall && showAuthAlert ? (
            <Alert
              onClose={() => {
                setShowAuthAlert(false)
              }}
              color="info"
              icon={false}
              sx={{ mx: -2 }}>
              <AuthenticateAlertContent />
            </Alert>
          ) : null}
          <InlineRegisterForm />
        </Box>
      ),
    },
    {
      value: DonationFormAuthState.NOREGISTER,
      label: 'Continue without registration',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          {showNoRegisterAlert && (
            <Alert
              onClose={() => {
                setShowNoRegisterAlert(false)
              }}
              color="info"
              icon={false}
              sx={{ mb: 1, mx: -2 }}>
              Ако не се регистрирате, ще получите само разписка, без сертификат за дарение, който да
              използвате за данъчни облекчения.
            </Alert>
          )}
          <EmailField label="Email" name="email" sx={{ mb: 1 }} />
        </Box>
      ),
    },
  ]

  return (
    <Box ref={sectionRef} component="section" id="select-authentication">
      <Typography mb={3} variant="h5">
        Как предпочитате да продължите?
      </Typography>
      {authentication === DonationFormAuthState.AUTHENTICATED ? (
        <Alert color="info">Вие сте влезли като {session?.user?.email}</Alert>
      ) : (
        <>
          <RadioAccordionGroup
            sx={{ marginBottom: theme.spacing(2) }}
            name="authentication"
            options={options}
          />
        </>
      )}
    </Box>
  )
}
