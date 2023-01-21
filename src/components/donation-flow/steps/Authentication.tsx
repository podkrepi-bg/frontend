import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { Box, Checkbox, Radio } from '@mui/material'

import RadioAccordionGroup from '../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'

export default function Authentication() {
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
      content: <InlineRegisterForm />,
    },
    {
      value: 'anonymous',
      label: 'Anonymous',
      content: <p>{t('anonymous-menu.checkbox-label')} </p>,
      control: session?.user ? <Checkbox /> : <Radio />,
    },
  ]
  return (
    <Box>
      <RadioAccordionGroup name="authentication" options={options} />
    </Box>
  )
}
