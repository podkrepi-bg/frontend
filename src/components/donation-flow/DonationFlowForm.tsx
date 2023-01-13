import React from 'react'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { Alert, Hidden, Unstable_Grid2 as Grid2 } from '@mui/material'

import { FirstStep } from 'gql/donations'
import { CardRegion } from 'gql/donations.enums'
import SubmitButton from 'components/common/form/SubmitButton'

import Amount from './steps/Amount'
import PaymentMethod from './steps/PaymentMethod'
import StepSplitter from './common/StepSplitter'

const initialValues = {
  amount: '',
  payment: '',
  amountWithFees: 0,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
  otherAmount: 0,
}

//TODO: Should be a SchemaOf the whole form
export const validationSchema: yup.SchemaOf<FirstStep> = yup
  .object()
  .defined()
  .shape({
    payment: yup.string().oneOf(['card', 'bank']),
    amount: yup.string().when('payment', {
      is: 'card',
      // Here we should fetch the possible payments to put into the oneOf, but it's not that important
      then: yup.string().required(),
    }),
    otherAmount: yup.number().when('amount', {
      is: 'other',
      then: yup.number().min(1, 'one-time-donation:errors-fields.other-amount').required(),
    }),
  })

export function DonationFlowForm() {
  return (
    <Formik
      initialValues={initialValues}
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
