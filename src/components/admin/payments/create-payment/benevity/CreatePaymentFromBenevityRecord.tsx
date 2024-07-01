import { useFindBankTransaction } from 'common/hooks/bank-transactions'
import { useFormikContext } from 'formik'
import React from 'react'
import { BenevityImportInput } from './helpers/benevity.types'
import { CircularProgress } from '@mui/material'
import { CreatePaymentFromBenevityForm } from './CreatePaymentFromBenevityForm'

export default function CreatePaymentFromBenevityRecord() {
  const { values } = useFormikContext<BenevityImportInput>()
  const { data, isLoading, isError } = useFindBankTransaction(
    values.transactionId ?? values.benevityData?.disbursementId,
  )
  if (isLoading) return <CircularProgress />
  if (isError) return
  if (!isLoading && !data)
    return `Bank donation with ${
      values.transactionId ?? values.benevityData.disbursementId
    } not found`

  return <CreatePaymentFromBenevityForm data={data} />
}
