import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Typography, Alert, useMediaQuery, Grid2 } from '@mui/material'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'

import {
  DonationFormAuthState,
  DonationFormData,
} from 'components/client/donation-flow/helpers/types'
import { AuthenticateAlertContent } from 'components/client/donation-flow/alerts/AlertsContent'
import theme from 'common/theme'
import FormTextField from 'components/common/form/FormTextField'
import EmailField from 'components/common/form/EmailField'

import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'
import { ids } from '../../common/DonationFormSections'
import { DonationFormSectionErrorText } from '../../common/DonationFormErrors'
import { featureEnabledForSession, Features } from 'common/util/featureFlag'

export default function Authentication({
  sectionRef,
  error,
}: {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
  error?: boolean
}) {
  const { t } = useTranslation('donation-flow')
  const { data: session } = useSession()
  const {
    values: { authentication, mode },
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
      label: t('step.authentication.login.label'),
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
      label: t('step.authentication.register.label'),
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
      label: t('step.authentication.noregister.label'),
      disabled: Boolean(session?.user || mode === 'subscription'),
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
              {t('step.authentication.noregister.description')}
            </Alert>
          )}
          {featureEnabledForSession(Features.IRISPAY, session) && (
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
              <Grid2 size={{ xs: 12 }}>
                <EmailField
                  label="donation-flow:step.authentication.field.billing-email"
                  name="billingEmail"
                  autoComplete="email"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <FormTextField
                  type="text"
                  label="donation-flow:step.authentication.field.billing-name"
                  name="billingName"
                  autoComplete="name"
                  fullWidth
                />
              </Grid2>
            </Grid2>
          )}
        </Box>
      ),
    },
  ]

  return (
    <Grid2 container direction="column" component="section" id={ids['authentication']}>
      <Typography mb={3} variant="h5">
        {t('step.authentication.title')}?
      </Typography>
      {authentication === DonationFormAuthState.AUTHENTICATED ? (
        <Alert color="info">
          {t('step.authentication.logged-as')} {session?.user?.email}
        </Alert>
      ) : (
        <Grid2 container gap={2} ref={sectionRef} id={ids['authentication']}>
          {error && <DonationFormSectionErrorText message={t('general.error.select-field')} />}
          <RadioAccordionGroup
            error={error}
            sx={{ marginBottom: theme.spacing(2) }}
            name="authentication"
            options={options}
          />
        </Grid2>
      )}
    </Grid2>
  )
}
