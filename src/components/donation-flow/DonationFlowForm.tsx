import React from 'react'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { Alert, Hidden, Unstable_Grid2 as Grid2 } from '@mui/material'

import { CardRegion } from 'gql/donations.enums'
import SubmitButton from 'components/common/form/SubmitButton'

import StepSplitter from './common/StepSplitter'
import Amount from './steps/Amount'
import PaymentMethod from './steps/PaymentMethod'
import Authentication from './steps/Authentication'
import { useSession } from 'next-auth/react'

export enum DonationFormDataAuthState {
  LOGIN = 'login',
  REGISTER = 'register',
  ANONYMOUS = 'anonymous',
  AUTHENTICATED = 'authenticated',
}

export enum DonationFormDataPaymentOption {
  CARD = 'card',
  BANK = 'bank',
}
export type DonationFormDataV2 = {
  authentication: DonationFormDataAuthState
  payment?: DonationFormDataPaymentOption
  email?: string
  cardRegion?: CardRegion
  cardIncludeFees?: boolean
  amountWithFees?: number
  otherAmount?: number
  amount?: string
}

const initialValues: DonationFormDataV2 = {
  amount: undefined,
  email: undefined,
  payment: undefined,
  amountWithFees: undefined,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
  otherAmount: 0,
  authentication: DonationFormDataAuthState.LOGIN,
}
//TODO: Should be a SchemaOf the whole form
export const validationSchema: yup.SchemaOf<DonationFormDataV2> = yup
  .object()
  .defined()
  .shape({
    payment: yup
      .string()
      .oneOf(Object.values(DonationFormDataPaymentOption))
      .required() as yup.SchemaOf<DonationFormDataPaymentOption>,
    amount: yup.string().when('payment', {
      is: 'card',
      then: () => yup.string().required(),
    }),
    amountWithFees: yup.number().when('payment', {
      is: 'card',
      then: () =>
        yup.number().min(1, 'one-time-donation:errors-fields.amount-with-fees').required(),
    }),
    otherAmount: yup.number().when('amount', {
      is: 'other',
      then: () => yup.number().min(1, 'one-time-donation:errors-fields.other-amount').required(),
    }),
    cardIncludeFees: yup.boolean(),
    cardRegion: yup
      .string()
      .oneOf(Object.values(CardRegion))
      .when('payment', {
        is: 'card',
        then: () => yup.string().oneOf(Object.values(CardRegion)).required(),
      }) as yup.SchemaOf<CardRegion>,
    authentication: yup
      .string()
      .oneOf(Object.values(DonationFormDataAuthState))
      .required() as yup.SchemaOf<DonationFormDataAuthState>,
    email: yup
      .string()
      .required()
      .when('authentication', {
        is: 'anonymous',
        then: () => yup.string().email('one-time-donation:errors-fields.email').required(),
      }),
  })

export function DonationFlowForm() {
  const { data: session } = useSession()
  return (
    <Formik
      initialValues={{ initialValues, email: session?.user?.email ?? '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log(values)
      }}
      validateOnMount
      validateOnBlur>
      {({ handleSubmit }) => (
        <Grid2 spacing={4} container>
          <Grid2 sm={12} md={8}>
            <Form
              onSubmit={handleSubmit}
              style={{
                maxWidth: '662px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              autoComplete="off">
              <StepSplitter content="1" />
              <Amount />
              <StepSplitter content="2" />
              <PaymentMethod />
              <StepSplitter content="3" />
              <Authentication />

              <SubmitButton>Submit</SubmitButton>
            </Form>
          </Grid2>
          <Hidden mdDown>
            <Grid2 md={4}>
              <Alert color="error">TODO: Alerts row here</Alert>
            </Grid2>
          </Hidden>
        </Grid2>
      )}
    </Formik>
  )
}
