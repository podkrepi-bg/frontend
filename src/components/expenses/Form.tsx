import React, { useState } from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, MenuItem, SelectChangeEvent, Typography } from '@mui/material'

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
import { useDocumentsList } from 'common/hooks/documents'
import { useVaultsList } from 'common/hooks/vaults'
import { DisabledByDefault } from '@mui/icons-material'

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

  const [type, setType] = useState<string>(data?.type || 'none')
  const [status, setStatus] = useState<string>(data?.status || 'pending')
  const [currency, setCurrency] = useState<string>(data?.currency || 'BGN')
  const [vaultId, setVaultId] = useState<string>(data?.vaultId || '')
  const [documentId, setDocumentId] = useState<string | undefined>(data?.documentId || undefined)
  const [deleted, setDeleted] = useState<boolean>(data?.deleted || false)

  const initialValues: ExpenseInput = {
    type,
    status,
    currency,
    amount: 0,
    vaultId,
    deleted,
    description: '',
    documentId,
    approvedById: undefined,
  }

  const documentIds = useDocumentsList().data?.map((record) => record.id) || []
  const vaultIds = useVaultsList().data?.map((record) => record.id) || []

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
            <FormTextField
              select
              name="type"
              label={t('fields.type')}
              value={`${initialValues.type}`}
              type="string"
              onChange={(e) => {
                setType(e.target.value)
              }}>
              {validTypes?.map((type) => {
                return (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              })}
            </FormTextField>
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              select
              name="status"
              label={t('fields.status')}
              value={`${initialValues.status}`}
              type="string"
              onChange={(e) => {
                setStatus(e.target.value)
              }}>
              {validStatuses?.map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                )
              })}
            </FormTextField>
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="number" name="amount" label="expenses:fields.amount" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              select
              name="currency"
              label={t('fields.currency')}
              value={`${initialValues.currency}`}
              type="string"
              onChange={(e) => {
                setCurrency(e.target.value)
              }}>
              {validCurrencies?.map((currency) => {
                return (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                )
              })}
            </FormTextField>
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              select
              type="string"
              name="vaultId"
              label="expenses:fields.vaultId"
              value={`${initialValues.vaultId}`}
              onChange={(e) => {
                setVaultId(e.target.value)
              }}>
              <MenuItem key={'none'} value="" disabled>
                {t('fields.empty')}
              </MenuItem>
              {vaultIds.map((id) => {
                return (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                )
              })}
            </FormTextField>
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              disabled={id == undefined}
              select
              name="deleted"
              label={t('fields.deleted')}
              value={`${initialValues.deleted}`}
              type="string"
              onChange={(e) => {
                setDeleted(e.target.value == 'false' ? false : true)
              }}>
              {['true', 'false'].map((deleted) => {
                return (
                  <MenuItem key={deleted} value={deleted}>
                    {deleted}
                  </MenuItem>
                )
              })}
            </FormTextField>
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
            <FormTextField
              select
              type="string"
              name="documentId"
              label="expenses:fields.documentId"
              value={`${initialValues.documentId}`}
              onChange={(e) => {
                setDocumentId(e.target.value)
              }}>
              <MenuItem key={'none'} value={undefined}>
                {t('fields.empty')}
              </MenuItem>
              {documentIds.map((id) => {
                return (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                )
              })}
            </FormTextField>
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="string" name="approvedById" label="expenses:fields.approvedById" />
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
