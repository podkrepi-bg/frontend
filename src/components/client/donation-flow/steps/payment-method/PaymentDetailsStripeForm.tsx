import { useSession } from 'next-auth/react'
import { LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js'
import { Box, BoxProps, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useField, useFormikContext } from 'formik'

import { DonationFormData } from '../../helpers/types'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { ids } from '../../common/DonationFormSections'

export type PaymentDetailsStripeFormProps = {
  containerProps?: BoxProps
}

const BillingNameField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e0e0e0',
    },
    '&:hover fieldset': {
      borderColor: '#e0e0e0',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },

  input: {
    '&::placeholder': {
      opacity: 0.7,
    },
    height: 10,
  },
}))

export default function PaymentDetailsStripeForm({
  containerProps,
}: PaymentDetailsStripeFormProps) {
  const { data: session } = useSession()
  const [isLoading, setIsloading] = useState(true)
  const formik = useFormikContext<DonationFormData>()
  const [billingName] = useField('billingName')
  const { t } = useTranslation()
  useEffect(() => {
    formik.setFieldValue('billingEmail', session?.user?.email || '')
  }, [session, isLoading])

  // Stripe ignores mutations to defaultValues on linkAuthentication after mount
  // and logs a warning. Memoizing on the session email keeps the options
  // reference stable across Formik-driven re-renders.
  const linkAuthOptions = useMemo(
    () => ({ defaultValues: { email: session?.user?.email ?? '' } }),
    [session?.user?.email],
  )

  return (
    <Box
      data-testid="stripe-payment-form"
      {...containerProps}
      display={'flex'}
      flexDirection={'column'}
      gap={2}>
      <LinkAuthenticationElement
        id="billingEmail"
        onChange={(e) => formik.setFieldValue('billingEmail', e.value.email)}
        options={linkAuthOptions}
      />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={0.2}
        sx={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.6s ease-out',
        }}>
        <Typography component={'label'} fontSize={'0.875rem'} fontWeight={350} color={'black'}>
          {t('donation-flow:step.payment-method.field.card-data.name-label')}
        </Typography>
        <BillingNameField
          fullWidth
          {...billingName}
          id="billingName"
          variant="outlined"
          placeholder={t('donation-flow:step.payment-method.field.card-data.name-label')}
          onInput={(e) => {
            const input = e.target as HTMLInputElement
            input.value = input.value
              .replace(/[^a-zA-Z\s-]/g, '')
              .replace(/[-\s]{2,}/g, (match) => match[0])
          }}
        />
      </Box>
      <PaymentElement
        id={ids['stripeCardField']}
        onReady={() => setIsloading(false)}
        options={{
          defaultValues: { billingDetails: { name: '' } },
          fields: {
            billingDetails: {
              name: 'auto',
              email: 'auto',
            },
          },
        }}
      />
    </Box>
  )
}
