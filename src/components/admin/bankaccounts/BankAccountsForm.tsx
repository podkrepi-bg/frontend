import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import * as yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid2, Typography } from '@mui/material'

import LinkButton from 'components/common/LinkButton'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { BankAccountResponse, BankAccountInput, BankAccountsData } from 'gql/bankaccounts'

import { useCreateBankAccount } from 'service/bankAccount'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'
import { routes } from 'common/routes'

import { AccountHolderType, BankAccountStatus } from './BankAccountTypes'
import BankAccountStatusSelect from './BankAccountStatusSelect'
import AccountHolderSelect from './AccountHolderSelect'

export const validationSchemaBankAccForm: yup.SchemaOf<BankAccountsData> = yup
  .object()
  .defined()
  .shape({
    status: yup.string().trim().min(1).max(100).required(),
    ibanNumber: yup.string().trim().min(5).max(34).required(),
    accountHolderName: yup.string().trim().min(10).max(100).required(),
    accountHolderType: yup.string().trim().min(1).max(100).required(),
    bankName: yup.string().trim().min(10).max(100).required(),
    bankIdCode: yup.string().trim().min(8).max(11).required(),
  })

export default function BankAccountsForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const initialValues: BankAccountInput = {
    status: BankAccountStatus.new,
    ibanNumber: '',
    accountHolderName: '',
    accountHolderType: AccountHolderType.individual,
    bankName: '',
    bankIdCode: '',
  }

  const mutation = useMutation<
    AxiosResponse<BankAccountResponse>,
    AxiosError<ApiErrors>,
    BankAccountInput
  >({
    mutationFn: useCreateBankAccount(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push(routes.admin.bankaccounts.index)
    },
  })

  const onSubmit = (data: BankAccountInput) => {
    mutation.mutate(data)
  }

  return (
    <Grid2 container direction="column" component="section">
      <Grid2 size={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('bankaccounts:headings.add')}
        </Typography>
      </Grid2>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchemaBankAccForm}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <BankAccountStatusSelect />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField type="text" name="ibanNumber" label="bankaccounts:fields.ibanNumber" />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              name="accountHolderName"
              label="bankaccounts:fields.accountHolderName"
            />
          </Grid2>
          <Grid2 size={12}>
            <AccountHolderSelect />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField type="text" name="bankName" label="bankaccounts:fields.bankName" />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField type="text" name="bankIdCode" label="bankaccounts:fields.bankIdCode" />
          </Grid2>
          <Grid2 size={6}>
            <SubmitButton fullWidth label="admin:cta.submit" loading={mutation.isLoading} />
          </Grid2>
          <Grid2 size={6}>
            <LinkButton
              fullWidth
              variant="contained"
              color="primary"
              href={routes.admin.bankaccounts.index}>
              {t('admin:cta.cancel')}
            </LinkButton>
          </Grid2>
        </Grid2>
      </GenericForm>
    </Grid2>
  )
}
