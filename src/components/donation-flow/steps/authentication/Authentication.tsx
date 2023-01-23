import { useSession } from 'next-auth/react'
import { Box, Checkbox, FormControlLabel, IconButton, Tooltip, Typography } from '@mui/material'

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
    values: { anonymous },
    setFieldValue,
  } = useFormikContext<DonationFormDataV2>()

  useEffect(() => {
    if (session?.user) {
      setFieldValue('authentication', null)
    }
  }, [session?.user])

  useEffect(() => {
    if (anonymous) {
      setFieldValue('authentication', null)
    }
  }, [anonymous])
  const options = [
    {
      value: 'login',
      label: 'Login',
      disabled: Boolean(session?.user),
      content: <InlineLoginForm />,
    },
    {
      value: 'register',
      label: 'Register',
      disabled: Boolean(session?.user),
      content: <InlineRegisterForm />,
    },
  ]

  return (
    <Box>
      <Typography mb={3} variant="h5">
        Как предпочитате да продължите?
      </Typography>
      <RadioAccordionGroup
        sx={{ marginBottom: theme.spacing(2) }}
        name="authentication"
        options={options}
      />
      {session?.user ? (
        <CheckboxField
          label={
            <Box display="flex" alignItems="center">
              <Typography>Искам да съм анонимен</Typography>
              <Tooltip title="Ако дарете анонимно, няма да можем да Ви изпратим сертификат за дарение, който да използвате за данъчни облекчения.">
                <IconButton color="primary">
                  <Info />
                </IconButton>
              </Tooltip>
            </Box>
          }
          name="anonymous"
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(_, checked) => {
                if (checked) {
                  setFieldValue('authentication', DonationFormDataAuthState.NOREGISTER)
                }
              }}
            />
          }
          label={
            <Box display="flex" alignItems="center">
              <Typography>Продължаване без регистрация</Typography>
              <Tooltip title="Ако не се регистрирате, няма да можем да Ви изпратим сертификат за дарение, който да използвате за данъчни облекчения.">
                <IconButton color="primary">
                  <Info />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
      )}
    </Box>
  )
}
