import React from 'react'
import { useRouter } from 'next/router'
import { MutationFunction, useMutation, UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BankAccountInput, BankAccountResponse } from 'gql/bankAccounts'
import { validationSchemaBankAccForm } from './BankAccountsForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { useViewBankAccount } from 'common/hooks/bankaccounts'
import GenericForm from 'components/common/form/GenericForm'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

export default function BankAccountsEditForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const id = String(router.query.slug)
  const { data }: UseQueryResult<BankAccountResponse> = useViewBankAccount(id)

  const initialValues: BankAccountInput = {
    status: data?.status,
    ibanNumber: data?.ibanNumber,
    accountHolderName: data?.accountHolderName,
    accountHolderType: data?.accountHolderType,
    bankName: data?.bankName,
    bankIdCode: data?.bankIdCode,
    fingerprint: data?.fingerprint,
    withdrawal: data?.withdraws,
  }

  const editBankAccount: MutationFunction<AxiosResponse<BankAccountResponse>, BankAccountInput> =
    async (data: BankAccountInput) => {
      return await apiClient.patch<BankAccountInput, AxiosResponse<BankAccountResponse>>(
        endpoints.bankAccounts.editBankAccount(id).url,
        data,
      )
    }

  const mutation = useMutation<
    AxiosResponse<BankAccountResponse>,
    AxiosError<ApiErrors>,
    BankAccountInput
  >({
    mutationFn: editBankAccount,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push(routes.bankaccounts.index)
    },
  })

  const onSubmit = (data: BankAccountInput) => {
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('bankaccounts:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchemaBankAccForm}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="bankaccounts:status" name="status" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" name="ibanNumber" label="bankaccounts:ibanNumber" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="accountHolderName"
              label="bankaccounts:accountHolderName"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="AccountHolderType"
              label="bankaccounts:AccountHolderType"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" name="bankName" label="bankaccounts:bankName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" name="bankIdCode" label="bankaccounts:bankIdCode" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" name="fingerprint" label="bankaccounts:fingerprint" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
