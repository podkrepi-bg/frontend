import React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import {
  ExpenseCurrency,
  ExpenseInput,
  ExpenseResponse,
  ExpenseStatus,
  ExpenseType,
} from 'gql/expenses'
import { useViewExpense } from 'common/hooks/expenses'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateExpense, useEditExpense } from 'service/expense'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import LinkButton from 'components/common/LinkButton'

import ExpenseSelect from './ExpenseSelect'

const validTypes = Object.keys(ExpenseType)
const validStatuses = Object.keys(ExpenseStatus)
const validCurrencies = Object.keys(ExpenseCurrency)

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.string().trim().oneOf(validTypes).required(),
    status: yup.string().trim().oneOf(validStatuses).required(),
    currency: yup.string().trim().oneOf(validCurrencies).required(),
    amount: yup.number().positive().integer().required(),
    vaultId: yup.string().trim().uuid().required(),
    deleted: yup.boolean().required(),
    description: yup.string().trim().notRequired(),
    documentId: yup.string().trim().uuid().notRequired(),
    approvedById: yup.string().trim().uuid().notRequired(),
  })

export default function Form() {
  const router = useRouter()
  const { t } = useTranslation('expenses')

  let id = router.query.id
  let data: ExpenseResponse | undefined

  if (id) {
    id = String(id)
    data = useViewExpense(id).data
  }

  const initialValues: ExpenseInput = {
    type: data?.type || 'none',
    status: data?.status || 'pending',
    currency: data?.currency || 'BGN',
    amount: data?.amount || 0,
    vaultId: data?.vaultId || '',
    deleted: data?.deleted || false,
    description: '',
    documentId: data?.documentId || '',
    approvedById: `${data?.approvedById}`,
  }

  const mutationFn = id ? useEditExpense(id) : useCreateExpense()

  const mutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, ExpenseInput>(
    {
      mutationFn,
      onError: () =>
        AlertStore.show(id ? t('alerts.edit-row.error') : t('alerts.new-row.error'), 'error'),
      onSuccess: () => {
        AlertStore.show(id ? t('alerts.edit-row.success') : t('alerts.new-row.success'), 'success')
        router.push(routes.admin.expenses.index)
      },
    },
  )

  async function onSubmit(data: ExpenseInput) {
    if (data.documentId == '') {
      data.documentId = undefined
    }
    if (data.approvedById == '') {
      data.approvedById = undefined
    }
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('headings.edit') : t('headings.add')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <ExpenseSelect name="type" allowEmpty={false} />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="status" allowEmpty={false} />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="number" name="amount" label="expenses:fields.amount" />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="currency" allowEmpty={false} />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="vaultId" allowEmpty={false} />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="deleted" allowEmpty={false} disabled={id == undefined} />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              name="description"
              label="expenses:fields.description"
              multiline
              rows={5}
            />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="documentId" allowEmpty={true} />
          </Grid>
          <Grid item xs={6}>
            <ExpenseSelect name="approvedById" allowEmpty={true} />
          </Grid>
          {id ? (
            <>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" type="submit" color="secondary">
                  {t('btns.save')}
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={6}>
              <SubmitButton fullWidth label="expenses:btns.submit" />
            </Grid>
          )}
          <Grid item xs={6}>
            <LinkButton
              fullWidth
              variant="contained"
              color="primary"
              href={routes.admin.expenses.index}>
              {t('btns.cancel')}
            </LinkButton>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
