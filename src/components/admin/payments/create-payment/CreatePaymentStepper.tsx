import { Card, CardContent, Dialog } from '@mui/material'

import { Form, Formik, useField, useFormikContext } from 'formik'
import React, { useContext } from 'react'
import * as yup from 'yup'
import { FileImportDialog } from './benevity/FileImportDialog'
import { benevityInputValidation, benevityValidation } from './benevity/helpers/validation'
import BenevityImportTypeSelector from './benevity/BenevityImportTypeSelector'
import CreatePaymentFromBenevityRecord from './benevity/CreatePaymentFromBenevityRecord'
import { PaymentContext } from '../store/CreatePaymentContext'
import PaymentTypeSelector from './PaymentTypeSelector'
import { BenevityManualImport } from './benevity/BenevityManualImport'
import { stripeInputValidation } from './stripe/helpers/validations'
import { StripeChargeLookupForm } from './stripe/StripeChargeLookupForm'
import { SelectedPaymentSource } from '../store/createPaymentStepReducer'
import { CreatePaymentFromStripeCharge } from './stripe/CreatePaymentFromStripeCharge'
import { ModalStore } from '../PaymentsPage'

type Validation = yup.InferType<
  typeof stripeInputValidation | typeof benevityValidation | typeof benevityInputValidation
>

type Steps<T> = {
  [key in SelectedPaymentSource]: {
    component: React.JSX.Element
    validation?: yup.SchemaOf<T> | null
  }[]
}

function CreatePaymentStepper() {
  const paymentContext = useContext(PaymentContext)
  const { isPaymentImportOpen, hideImport } = ModalStore
  const { payment, dispatch } = paymentContext

  const steps: Steps<Validation> = {
    none: [{ component: <PaymentTypeSelector /> }],
    stripe: [
      {
        component: <StripeChargeLookupForm />,
        validation: stripeInputValidation,
      },
      {
        component: <CreatePaymentFromStripeCharge />,
      },
    ],
    benevity: [
      {
        component: <BenevityImportTypeSelector />,
        validation: null,
      },
      {
        component:
          payment.benevityImportType === 'file' ? <FileImportDialog /> : <BenevityManualImport />,
        validation: payment.benevityImportType === 'file' ? null : benevityInputValidation,
      },
      {
        component: <CreatePaymentFromBenevityRecord />,
        validation: benevityValidation,
      },
    ],
  }
  const onClose = () => {
    dispatch({ type: 'RESET_MODAL' })
    hideImport()
  }
  return (
    <Dialog open={isPaymentImportOpen} onClose={onClose} maxWidth={false}>
      <Card sx={{ display: 'flex' }}>
        <CardContent>
          <Formik
            validateOnBlur
            onSubmit={async () => {
              if (payment.step < steps[payment.paymentSource].length - 1) {
                dispatch({ type: 'INCREMENT_STEP' })
              }
            }}
            initialValues={{}}
            validationSchema={steps[payment.paymentSource][payment.step].validation}>
            <Form>{steps[payment.paymentSource][payment.step].component}</Form>
          </Formik>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default CreatePaymentStepper
