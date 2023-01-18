import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { Box } from '@mui/material'

import RadioAccordionGroup from '../common/RadioAccordionGroup'
import { DonationFlowContext } from '../DonationFlowContext'
import InlineLoginForm from './InlineLoginForm'

export default function Authentication() {
  const DonationContext = useContext(DonationFlowContext)
  const { data: session } = useSession()
  const { t } = useTranslation('one-time-donation')
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
      content: <>Register Form</>,
    },
    {
      value: 'anonymous',
      label: 'Anonymous',
      content: <p>{t('anonymous-menu.checkbox-label')} </p>,
    },
  ]
  return (
    <Box>
      <RadioAccordionGroup name="authentication" options={options} />
    </Box>
  )
}
