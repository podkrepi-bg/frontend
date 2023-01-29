import { useSession } from 'next-auth/react'
import { Alert, Box, IconButton, Tooltip, Typography } from '@mui/material'

import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import CheckboxField from 'components/common/form/CheckboxField'
import theme from 'common/theme'
import { Info } from '@mui/icons-material'
import {
  DonationFormDataAuthState,
  DonationFormDataV2,
} from 'components/donation-flow/DonationFlowForm'

export default function Authentication() {
  const { data: session } = useSession()
  const {
    values: { isAnonymous, authentication },
    setFieldValue,
  } = useFormikContext<DonationFormDataV2>()

  useEffect(() => {
    if (session?.user) {
      setFieldValue('authentication', DonationFormDataAuthState.AUTHENTICATED)
    }
  }, [session?.user])

  useEffect(() => {
    if (isAnonymous) {
      setFieldValue('authentication', null)
    }
  }, [isAnonymous])
  const options = [
    {
      value: DonationFormDataAuthState.LOGIN,
      label: 'Login',
      disabled: Boolean(session?.user),
      content: <InlineLoginForm />,
    },
    {
      value: DonationFormDataAuthState.REGISTER,
      label: 'Register',
      disabled: Boolean(session?.user),
      content: <InlineRegisterForm />,
    },
    {
      value: DonationFormDataAuthState.NOREGISTER,
      label: 'Continue without registration',
      disabled: Boolean(session?.user),
      content: (
        <Box>
          <Alert color="info">
            Ако не се регистрирате, няма да можем да Ви изпратим сертификат за дарение, който да
            използвате за данъчни облекчения.
          </Alert>
        </Box>
      ),
    },
  ]

  return (
    <Box>
      <Typography mb={3} variant="h5">
        Как предпочитате да продължите?
      </Typography>
      {authentication === DonationFormDataAuthState.AUTHENTICATED ? (
        <Alert color="info">Вие сте влезли в системата като {session?.user?.email}</Alert>
      ) : (
        <>
          <RadioAccordionGroup
            sx={{ marginBottom: theme.spacing(2) }}
            name="authentication"
            options={options}
          />
        </>
      )}
      <CheckboxField
        label={
          <Box display="flex" alignItems="center">
            <Typography>Искам да съм анонимен</Typography>
            <Tooltip title="Ако дарете анонимно, данните ще останат недостъпни за бенефициента.">
              <IconButton color="primary">
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
        }
        name="isAnonymous"
      />
    </Box>
  )
}
