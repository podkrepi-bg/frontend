import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { Box } from '@mui/material'

import RadioAccordionGroup from '../common/RadioAccordionGroup'
import { DonationFlowContext } from '../DonationFlowContext'

export default function Authentication() {
  const DonationContext = useContext(DonationFlowContext)
  const { data: session } = useSession()
  const options = [
    {
      value: 'login',
      label: 'Login',
      disabled: Boolean(session?.user),
      content: <>Login form</>,
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
      content: <>Anonymous </>,
    },
  ]
  return (
    <Box>
      <RadioAccordionGroup name="authentication" options={options} />
    </Box>
  )
}
