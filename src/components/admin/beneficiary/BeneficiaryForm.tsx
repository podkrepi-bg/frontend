import createStyles from '@mui/styles/createStyles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { Button, Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useRouter } from 'next/router'
import React from 'react'
import * as yup from 'yup'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { BeneficiaryFormData } from 'gql/beneficiary'
import { useCreateBeneficiary } from 'service/beneficiary'
import { AxiosError, AxiosResponse } from 'axios'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'
import theme from 'common/theme'

export const validationSchema: yup.SchemaOf<BeneficiaryFormData> = yup.object().defined().shape({
  type: yup.string().required(),
  personId: yup.string().notRequired(),
  companyId: yup.string().notRequired(),
  coordinatorId: yup.string().required(),
  countryCode: yup.string().required(),
  cityId: yup.string().required(),
  description: yup.string().required(),
  publicData: yup.string().notRequired(),
  privateData: yup.string().notRequired(),
  campaigns: yup.object().required(),
})

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

export default function BankAccountsForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()
  const initialValues: BeneficiaryFormData = {
    type: '',
    personId: '',
    companyId: '',
    coordinatorId: '',
    countryCode: '',
    cityId: '',
    description: '',
    publicData: '',
    privateData: '',
    campaigns: {},
  }

  const cb = useCreateBeneficiary()

  const mutation = useMutation<
    AxiosResponse<BeneficiaryFormData>,
    AxiosError<ApiErrors>,
    BeneficiaryFormData
  >({
    mutationFn: cb,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push('/admin/beneficiary')
    },
  })

  const onSubmit = (data: BeneficiaryFormData) => {
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          Add beneficiary
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="type"
              autoComplete="target-amount"
              label="Type"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="personId"
              autoComplete="target-amount"
              label="Person"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="companyId"
              autoComplete="target-amount"
              label="Company (optional)"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="coordinatorId"
              autoComplete="target-amount"
              label="Coordinator"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="countryCode"
              autoComplete="target-amount"
              label="Country code"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="cityId"
              autoComplete="target-amount"
              label="City name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '193%', height: '30px' }}
              type="text"
              name="description"
              autoComplete="target-amount"
              label="Description"
              multiline
              rows={1.5}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15%',
              marginTop: '4%',
            }}>
            <SubmitButton
              style={{ width: '50%' }}
              label="Add"
              loading={mutation.isLoading}
              sx={{ backgroundColor: theme.palette.secondary.main }}
            />
            <Button
              href="/admin/beneficiary"
              variant="outlined"
              sx={{
                width: '50%',
                marginTop: '1%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
              }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
