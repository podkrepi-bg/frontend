import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { routes } from 'common/routes'
import { createBankAccountRequest } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
/* import {
  AccountHolderType,
  BankAccountInput,
  BankAccountResponse,
  BankAccountStatus,
} from 'gql/bankccounts' */

const validationSchema: any = yup
  .object()
  .defined()
  .shape({
    status: yup.string().trim().min(1).max(100).required(),
    ibanNumber: yup.string().trim().min(10).max(100).required(),
    accountHolderName: yup.string().trim().min(10).max(100).required(),
    accountHolderType: yup.string().trim().min(1).max(100).required(),
    bankName: yup.string().trim().min(10).max(100).required(),
    bankIdCode: yup.string().trim().min(10).max(100).required(),
    fingerprint: yup.string().trim().min(10).max(100).required(),
    withdrawal: yup.string().trim().min(10).max(100).required(),
  })

const defaults: any = {
  status: '',
  ibanNumber: '',
  accountHolderName: '',
  accountHolderType: '',
  bankName: '',
  bankIdCode: '',
  fingerprint: '',
  withdrawal: '',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

/* export type CampaignFormProps = { initialValues?: CampaignFormData } */

export default function BankAccountsForm({ initialValues = defaults }: any) {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<any, any, any, any>({
    mutationFn: createBankAccountRequest,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push(routes.bankaccounts.index)
    },
  })

  const onSubmit = (data: any) => {
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
        validationSchema={validationSchema}>
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
              name="accountHolderType"
              label="bankaccounts:accountHolderType"
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
            <FormTextField type="text" name="withdrawal" label="bankaccounts:withdrawal" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
