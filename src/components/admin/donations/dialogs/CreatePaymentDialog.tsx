import { Box, Button, Card, CardContent, Dialog, TextField, Typography } from '@mui/material'
import BenevityImportDialog, {
  DonationImportSummary,
} from 'components/admin/bank-transactions/modals/BenevityImportDialog'
import { Form, Formik, useField, useFormikContext } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { FileImportDialog } from 'components/admin/bank-transactions/modals/BenevityImportDialog'
import {
  CreatePaymentStore,
  SelectedPaymentSource,
} from 'components/admin/bank-transactions/store/BenevityImportStore'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { TranslatableField, translateError } from 'common/form/validation'

const stripeInputValidation = yup.object({
  extPaymentIntentId: yup.string().required().matches(/^pi_/, 'Невалиден номер на Страйп'),
})

const benevityInputValidation = yup.object({
  transactionId: yup.string().required(),
})

function StripeInputDialog() {
  const [field, meta] = useField('extPaymentIntentId')
  const { handleSubmit } = useFormikContext()
  const { t } = useTranslation()
  const helperText = translateError(meta.error as TranslatableField, t)

  const handleSubmitS = (e: any) => {
    handleSubmit()
  }
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }} />
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Въведете номер на плащане от Страйп')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          {...field}
          error={Boolean(meta.error)}
          helperText={helperText}
        />
        <Typography variant="body2" color={'gray'} fontSize={14}>
          Платещените номера от Страйп започват с:
          <br /> pi_
        </Typography>
        <Button
          type="button"
          variant="outlined"
          onClick={(e) => handleSubmitS(e)}
          sx={{ marginTop: 4 }}>
          Търсене на запис
        </Button>
      </Box>
    </>
  )
}

function PaymentTypeSelectDialog() {
  const { setPaymentSource } = CreatePaymentStore
  const { t } = useTranslation('')
  const handleSubmit = (source: SelectedPaymentSource) => {
    setPaymentSource(source)
  }
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        Ръчно добавяне на плащане
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={() => handleSubmit('stripe')}>
          През Stripe
        </Button>
        <Button variant="outlined" onClick={() => handleSubmit('benevity')}>
          През Benevity
        </Button>
      </Box>
    </>
  )
}

function BenevityManualImport() {
  const { t } = useTranslation('')
  const [field, meta] = useField('transactionId')
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: '16px', textAlign: 'center' }} />
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Въведете ID от Benevity или ID на банкова транзация')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <TextField
          {...field}
          error={Boolean(meta.error) && Boolean(meta.touched)}
          helperText={helperText}
        />
        <Button type="button">Търсене на запис</Button>
      </Box>
    </>
  )
}

type Validation = yup.InferType<typeof stripeInputValidation | typeof benevityInputValidation>
type Steps<T> = {
  [key in SelectedPaymentSource]: {
    component: React.JSX.Element
    validation?: yup.SchemaOf<T>
  }[]
}

function CreatePaymentDialog() {
  const { isImportModalOpen, hideImportModal, paymentSource, importType, step } = CreatePaymentStore

  const steps: Steps<Validation> = {
    none: [{ component: <PaymentTypeSelectDialog /> }],
    stripe: [
      {
        component: <StripeInputDialog />,
        validation: stripeInputValidation,
      },
    ],
    benevity: [
      {
        component: <BenevityImportDialog />,
      },
      {
        component: importType === 'file' ? <FileImportDialog /> : <BenevityManualImport />,
        validation: importType === 'file' ? undefined : benevityInputValidation,
      },
      {
        component: <DonationImportSummary />,
      },
    ],
  }
  return (
    <Dialog open={isImportModalOpen} onClose={hideImportModal} maxWidth="lg">
      <Card sx={{ display: 'flex', flexGrow: 1, maxWidth: '100%' }}>
        <CardContent>
          <Formik
            validateOnBlur
            onSubmit={(values, helpers) => {
              console.log(values, helpers)
            }}
            initialValues={{}}
            validationSchema={steps[paymentSource][step].validation}>
            <Form>{steps[paymentSource][step].component}</Form>
          </Formik>
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default observer(CreatePaymentDialog)
