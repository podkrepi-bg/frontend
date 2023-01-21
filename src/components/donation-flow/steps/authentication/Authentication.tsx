import { useSession } from 'next-auth/react'
import { Box, Checkbox, Radio, Typography } from '@mui/material'

import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import InlineLoginForm from './InlineLoginForm'
import InlineRegisterForm from './InlineRegisterForm'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'

export default function Authentication() {
  const { data: session } = useSession()
  const formik = useFormikContext()
  useEffect(() => {
    if (session?.user) {
      formik.setFieldValue('authentication', undefined)
    }
  }, [session?.user])
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
      label: 'Without registration',
      control: session?.user ? <Checkbox /> : <Radio />,
      content: <></>,
    },
  ]

  return (
    <Box>
      <Typography mb={3} variant="h5">
        Как предпочитате да продължите?
      </Typography>
      <RadioAccordionGroup name="authentication" options={options} />
    </Box>
  )
}
