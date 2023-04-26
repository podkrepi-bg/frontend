import { Edit } from '@mui/icons-material'
import { Dialog, Box, Tooltip, Grid, DialogContent, DialogTitle } from '@mui/material'
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid'
import { paymentRef } from 'common/form/validation'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { BankDonationStatus } from 'gql/bank-transactions.enums'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'
import CloseModalButton from 'components/common/CloseModalButton'
import { BankTransactionEditRefInput, BankTransactionEditRefResponse } from 'gql/bank-transactions'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useEditTransactionPaymentRef } from 'service/bankTransaction'
import { AlertStore } from 'stores/AlertStore'
import { ApiError } from 'next/dist/server/api-utils'

interface RenderCellProps {
  params: GridRenderCellParams
}

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}

export type UpdateBankTransactionCodeInput = {
  paymentRef: string
}

const validationSchema: yup.SchemaOf<UpdateBankTransactionCodeInput> = yup
  .object()
  .defined()
  .shape({
    paymentRef: paymentRef.required(),
  })

export default function RenderBankDonationStatusCell({ params }: RenderCellProps) {
  const { t } = useTranslation()
  const donationStatus = params.row.bankDonationStatus ? params.row.bankDonationStatus : ''
  const showEdit = [BankDonationStatus.unrecognized, BankDonationStatus.importFailed].includes(
    donationStatus,
  )

  const [isOpen, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  function EditPaymentRefModal() {
    const [loading, setLoading] = useState(false)
    const apiRef = useGridApiContext()

    const handleError = (e: AxiosError<ApiError>) => {
      const error = e.response?.data?.message
      console.log(e.response)
      AlertStore.show(error ? error : t('common:alerts.error'), 'error')
    }

    const mutation = useMutation<
      AxiosResponse<BankTransactionEditRefResponse>,
      AxiosError<ApiError>,
      BankTransactionEditRefInput
    >({
      mutationFn: useEditTransactionPaymentRef(params.row.id),
      onError: (error) => handleError(error),
      onSuccess: (response) => {
        AlertStore.show(t('common:alerts.message-sent'), 'success')
        //Update Cell Value
        apiRef.current.updateRows([
          {
            id: response.data.trxId,
            matchedRef: response.data.paymentRef,
            bankDonationStatus: response.data.status,
          },
        ])
        handleClose()
      },
    })

    async function onSubmit(values: { paymentRef: string }) {
      setLoading(true)
      try {
        await mutation.mutateAsync(values)
      } finally {
        setLoading(false)
      }
    }

    return (
      <Dialog open onClose={handleClose} sx={{ scroll: 'none' }} fullWidth={true} maxWidth={'sm'}>
        <DialogContent
          style={{
            overflow: 'hidden',
            padding: '4rem',
            paddingTop: '1rem',
            width: '100%',
          }}>
          <Grid style={{ display: 'flex', justifyContent: 'end', marginRight: '-4rem' }}>
            <CloseModalButton href={''} onClose={handleClose} />
          </Grid>
          <DialogTitle style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {t('bank-transactions:cta.apply-ref-heading')}
          </DialogTitle>
          <Grid container direction="column" component="section">
            <GenericForm
              onSubmit={onSubmit}
              initialValues={{ paymentRef: '' }}
              validationSchema={validationSchema}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ marginBottom: '1rem' }}>
                  <FormTextField
                    type="text"
                    label="bank-transactions:payment-ref"
                    name="paymentRef"
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton
                    fullWidth
                    label="bank-transactions:cta.apply-ref"
                    loading={loading}
                  />
                </Grid>
              </Grid>
            </GenericForm>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '95%' }}>
        {donationStatus}
        {showEdit ? (
          <Tooltip title={t('bank-transactions:cta.edit')}>
            <Edit sx={addIconStyles} color="action" fontSize="medium" onClick={handleOpen} />
          </Tooltip>
        ) : (
          <></>
        )}
      </Box>
      {isOpen && <EditPaymentRefModal />}
    </>
  )
}
