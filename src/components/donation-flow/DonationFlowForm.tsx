import React from 'react'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { FirstStep } from 'gql/donations'
import { CardRegion } from 'gql/donations.enums'
import SubmitButton from 'components/common/form/SubmitButton'
import Amount from './steps/Amount'
import PaymentMethod from './steps/PaymentMethod'
import StepSplitter from './common/StepSplitter'

const initialValues = {
  amount: '',
  payment: 'card',
  amountWithFees: 0,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
  otherAmount: 0,
}

export const validationSchema: yup.SchemaOf<FirstStep> = yup
  .object()
  .defined()
  .shape({
    payment: yup.string().required().oneOf(['card', 'bank']),
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
      )}
    </Formik>
  )
}
