import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { Box, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import LinkButton from 'components/common/LinkButton'
import { useViewExpense } from 'common/hooks/expenses'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import DeletedCheckbox from 'components/common/DeletedCheckbox'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import FormTextField from 'components/common/form/FormTextField'
import { useCreateExpense, useEditExpense } from 'service/expense'
import DocumentSelect from 'components/admin/documents/grid/DocumentSelect'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { ExpenseInput, ExpenseResponse, ExpenseStatus, ExpenseType } from 'gql/expenses'

import VaultSelect from '../vaults/VaultSelect'
import ExpenseTypeSelect from './ExpenseTypeSelect'
import ExpenseStatusSelect from './ExpenseStatusSelect'
import { useVaultsList } from 'common/hooks/vaults'
import PersonSelect from 'components/common/person/PersonSelect'

const validTypes = Object.keys(ExpenseType)
const validStatuses = Object.keys(ExpenseStatus)
const validCurrencies = Object.keys(Currency)

export default function Form() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { t } = useTranslation('expenses')
  let id = router.query.id
  let data: ExpenseResponse | undefined
  const { data: vaults } = useVaultsList()
  const validationSchema = yup
    .object()
    .defined()
    .shape({
      type: yup.string().trim().oneOf(validTypes).required(),
      status: yup.string().trim().oneOf(validStatuses).required(),
      currency: yup.string().trim().oneOf(validCurrencies).required(),
      amount: yup.number().when('vaultId', {
        is: (value: string) => value !== undefined,
        then: yup
          .number()
          .positive()
          .required()
          .test({
            name: 'max',
            exclusive: false,
            params: {},
            message: t('fields-error.amount-unavailable'),
            test: function (value) {
              if (!value) return false
              const currentVault = vaults?.find((curr) => curr.id == this.parent.vaultId)
              const currentAmount =
                Number(currentVault?.amount) - Number(currentVault?.blockedAmount)
              return value < Number(currentAmount)
            },
          }),
        otherwise: yup.number().positive().integer().required(),
      }),
      vaultId: yup.string().trim().uuid().required(),
      deleted: yup.boolean().required(),
      description: yup.string().trim().notRequired(),
      documentId: yup.string().trim().uuid().notRequired(),
      approvedById: yup.string().trim().notRequired(),
    })
  if (id) {
    id = String(id)
    data = useViewExpense(id).data
  }

  const initialValues: ExpenseInput = {
    type: data?.type || ExpenseType.none,
    status: data?.status || ExpenseStatus.pending,
    currency: data?.currency || Currency.BGN,
    amount: data?.amount || 0,
    money: 0,
    vaultId: data?.vaultId || '',
    deleted: data?.deleted || false,
    description: data?.description || '',
    documentId: data?.documentId || '',
    approvedById: data?.approvedById || '',
    spentAt: '',
  }

  const mutationFn = id ? useEditExpense(id) : useCreateExpense()

  const mutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, ExpenseInput>(
    {
      mutationFn,
      onError: () =>
        AlertStore.show(id ? t('alerts.edit-row.error') : t('alerts.new-row.error'), 'error'),
      onSuccess: () => {
        queryClient.invalidateQueries([endpoints.expenses.listExpenses.url])
        router.push(routes.admin.expenses.index)
        AlertStore.show(id ? t('alerts.edit-row.success') : t('alerts.new-row.success'), 'success')
      },
    },
  )

  async function onSubmit(data: ExpenseInput, { setFieldError }: FormikHelpers<ExpenseInput>) {
    try {
      if (data.documentId == '') {
        data.documentId = null
      }
      if (data.approvedById == '') {
        data.approvedById = null
      }
      mutation.mutateAsync(data)
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
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
            <ExpenseTypeSelect />
          </Grid>
          <Grid item xs={6}>
            <ExpenseStatusSelect />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              disabled={id ? true : false}
              type="number"
              name="amount"
              label="expenses:fields.amount"
            />
          </Grid>
          <Grid item xs={6}>
            <CurrencySelect />
          </Grid>
          <Grid item xs={6}>
            <VaultSelect
              name="vaultId"
              label="expenses:fields.vault"
              disabled={id ? true : false}
              vaults={vaults}
            />
          </Grid>
          <Grid item xs={6}>
            <DocumentSelect />
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
          {(id && (
            <Grid item xs={id ? 10 : 12}>
              <FormTextField
                type="text"
                name="approvedById"
                label={t('expenses:fields:approvedBy')}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
          )) || (
            <Grid item xs={12}>
              <PersonSelect name="approvedById" label={t('expenses:fields:approvedBy')} />
            </Grid>
          )}
          {id && (
            <Grid item xs={2}>
              <DeletedCheckbox />
            </Grid>
          )}
          <Grid item xs={6}>
            <SubmitButton fullWidth label={id ? 'expenses:btns.save' : 'expenses:btns.submit'} />
          </Grid>
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
