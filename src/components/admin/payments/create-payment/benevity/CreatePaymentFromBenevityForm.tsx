import { Button, Grid, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useImportBenevityDonation } from 'service/donation'
import { CreatePaymentStore, benevityInitialValues } from '../../store/CreatePaymentStore'
import { useFormikContext } from 'formik'
import { AxiosResponse } from 'axios'
import { TPaymentResponse } from 'gql/donations'
import { BenevityRequest } from './helpers/benevity.types'
import { useEffect } from 'react'
import { fromMoney } from 'common/util/money'
import SubmitButton from 'components/common/form/SubmitButton'
import { BenevityImportInput } from './helpers/benevity.types'
import BenevityTransactionData from './helpers/form/BenevityTransactionData'
import { BenevityDonationsTable } from './helpers/form/BenevityDonationTable'
import { BankTransactionsInput } from 'gql/bank-transactions'

type CreatePaymentFromBenevityForm = {
  data: BankTransactionsInput
}
export function CreatePaymentFromBenevityForm({ data }: CreatePaymentFromBenevityForm) {
  const { hideImportModal } = CreatePaymentStore

  const benevityMutation = useMutation<AxiosResponse<TPaymentResponse>, unknown, BenevityRequest>({
    mutationFn: useImportBenevityDonation(),
  })
  const { values, setFieldValue } = useFormikContext<BenevityImportInput>()

  useEffect(() => {
    if (!data) return
    setFieldValue('amount', fromMoney(data.amount ?? 0))
    setFieldValue('transactionId', data.id)
    setFieldValue('currency', values.benevityData?.currency)
    if (!values.benevityData) {
      setFieldValue('benevityData', benevityInitialValues)
    }
  }, [])

  useEffect(() => {
    setFieldValue('exchangeRate', values.amount / values.benevityData?.netTotalPayment)
  }, [values.amount, values.benevityData?.netTotalPayment])

  const handleSubmit = () => {
    const bodyReq: BenevityRequest = {
      amount: values.amount,
      exchangeRate: values.exchangeRate,
      benevityData: values.benevityData,
      extPaymentIntentId: values.transactionId,
    }
    benevityMutation.mutate(bodyReq)
  }
  return (
    <Grid container sx={{ padding: 2 }} xs={12} gap={2}>
      <Grid container item direction={'column'}>
        <BenevityTransactionData
          exchangeRate={values.exchangeRate ?? 0}
          sentCurrency={values.currency}
          receivedCurrency={data.currency}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography fontSize={17} sx={{ marginTop: 5 }}>
          Дарения по кампании:
        </Typography>
        <BenevityDonationsTable />
      </Grid>
      <Grid container item gap={2} direction={'column'} alignItems={'center'}>
        <Grid container item sx={{ width: '40%' }} gap={2}>
          <SubmitButton
            fullWidth
            label="campaigns:cta.submit"
            loading={benevityMutation.isLoading}
            onClick={handleSubmit}
          />
          <Button fullWidth onClick={() => hideImportModal()}>
            Отказ
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
