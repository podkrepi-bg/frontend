import { useSession } from 'next-auth/react'
import { LinkAuthenticationElement, PaymentElement } from '@stripe/react-stripe-js'
import { Box, BoxProps, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik'

import { DonationFormData } from '../../helpers/types'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'

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
        options={{
          defaultValues: {
            email: formik.values.billingEmail ?? session?.user?.email ?? '',
          },
        }}
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
        />
      </Box>
      <PaymentElement
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
