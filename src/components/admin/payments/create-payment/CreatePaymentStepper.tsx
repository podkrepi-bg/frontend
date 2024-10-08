import { Button, Card, CardContent, Dialog, Grid, IconButton } from '@mui/material'

import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import * as yup from 'yup'
import { FileImportDialog } from './benevity/FileImportDialog'
import { benevityInputValidation, benevityValidation } from './benevity/helpers/validation'
import BenevityImportTypeSelector from './benevity/BenevityImportTypeSelector'
import CreatePaymentFromBenevityRecord from './benevity/CreatePaymentFromBenevityRecord'
import { PaymentContext } from './CreatePaymentDialog'
import PaymentTypeSelector from './PaymentTypeSelector'
import { BenevityManualImport } from './benevity/BenevityManualImport'
import { stripeInputValidation } from './stripe/helpers/validations'
import { StripeChargeLookupForm } from './stripe/StripeChargeLookupForm'
import { SelectedPaymentSource } from './helpers/createPaymentStepReducer'
import { CreatePaymentFromStripeCharge } from './stripe/CreatePaymentFromStripeCharge'
import { ModalStore } from '../PaymentsPage'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Close } from '@mui/icons-material'
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

  const handleOnBackClick = () => {
    dispatch({ type: 'DECREMENT_STEP' })
  }
  return (
    <Dialog open={isPaymentImportOpen} onClose={onClose} maxWidth={false}>
      <Card sx={{ display: 'flex' }}>
        <CardContent>
          <Grid container direction="column" gap={3}>
            <Grid
              container
              item
              direction={'row'}
              justifyContent={'space-between'}
              px={1}
              sx={{ display: payment.paymentSource !== 'none' ? 'flex' : 'none' }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleOnBackClick}
                sx={{ display: payment.paymentSource !== 'none' ? 'flex' : 'none', padding: 0 }}>
                Назад
              </Button>
              <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end', padding: 0 }}>
                <Close color="error" />
              </IconButton>
            </Grid>
            <Grid container item>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default CreatePaymentStepper
