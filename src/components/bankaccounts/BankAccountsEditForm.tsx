import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import makeStyles from '@mui/styles/makeStyles'
import { Grid, Typography } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import createStyles from '@mui/styles/createStyles'
import { useMutation, UseQueryResult } from 'react-query'

import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { useEditBankAccount } from 'service/bankAccount'
import GenericForm from 'components/common/form/GenericForm'
import { useViewBankAccount } from 'common/hooks/bankaccounts'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import LinkButton from 'components/common/LinkButton'
import { BankAccountInput, BankAccountResponse } from 'gql/bankaccounts'

import { validationSchemaBankAccForm } from './BankAccountsForm'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

type Props = {
  id: string
}
export default function BankAccountsEditForm({ id }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const { data }: UseQueryResult<BankAccountResponse> = useViewBankAccount(id)

  const initialValues: BankAccountInput = {
    status: data?.status,
    ibanNumber: data?.ibanNumber,
    accountHolderName: data?.accountHolderName,
    accountHolderType: data?.accountHolderType,
    bankName: data?.bankName,
    bankIdCode: data?.bankIdCode,
    fingerprint: data?.fingerprint,
  }

  const mutation = useMutation<
    AxiosResponse<BankAccountResponse>,
    AxiosError<ApiErrors>,
    BankAccountInput
  >({
    mutationFn: useEditBankAccount(id),
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
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('bankaccounts:headings.edit')}
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
          <Grid item xs={6}>
            <SubmitButton fullWidth label="admin:cta.submit" loading={mutation.isLoading} />
          </Grid>
          <Grid item xs={6}>
            <LinkButton
              fullWidth
              variant="contained"
              color="primary"
              href={routes.admin.bankaccounts.index}>
              {t('admin:cta.cancel')}
            </LinkButton>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
