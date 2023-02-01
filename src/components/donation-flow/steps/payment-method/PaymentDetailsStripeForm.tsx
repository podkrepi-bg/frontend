import { useSession } from 'next-auth/react'
import { LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js'
import { Box, BoxProps } from '@mui/material'

export type PaymentDetailsStripeFormProps = {
  containerProps?: BoxProps
}
export default function PaymentDetailsStripeForm({
  containerProps,
}: PaymentDetailsStripeFormProps) {
  const { data: session } = useSession()
  return (
    <Box {...containerProps}>
      <LinkAuthenticationElement
        options={{
          defaultValues: {
            email: session?.user?.email || '',
          },
        }}
      />
      <PaymentElement />
    </Box>
  )
}
