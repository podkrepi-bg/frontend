import { useSession } from 'next-auth/react'
import { LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js'
import { Box, BoxProps } from '@mui/material'
import { useEffect, useState } from 'react'

export type PaymentDetailsStripeFormProps = {
  containerProps?: BoxProps
}
export default function PaymentDetailsStripeForm({
  containerProps,
}: PaymentDetailsStripeFormProps) {
  const { data: session } = useSession()
  const [email, setEmail] = useState<string>(session?.user?.email || '')
  useEffect(() => {
    setEmail(session?.user?.email || '')
  }, [session])
  return (
    <Box {...containerProps}>
      <LinkAuthenticationElement
        options={{
          defaultValues: {
            email,
          },
        }}
      />
      <PaymentElement />
    </Box>
  )
}
