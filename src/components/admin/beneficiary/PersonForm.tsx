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
import { PersonFormData } from 'gql/person'
import { useCreateBeneficiary } from 'service/restRequests'
import { AxiosError, AxiosResponse } from 'axios'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'
import theme from 'common/theme'

export const validationSchemaPersonForm: yup.SchemaOf<PersonFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    company: yup.string().notRequired(),
    adress: yup.string().required(),
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
  const initialValues: PersonFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    adress: '',
  }

  const mutation = useMutation<
    AxiosResponse<PersonFormData>,
    AxiosError<ApiErrors>,
    PersonFormData
  >({
    mutationFn: useCreateBeneficiary(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      router.push('/admin/person')
    },
  })

  const onSubmit = (data: PersonFormData) => {
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          Add person
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchemaPersonForm}>
        <Grid container spacing={3}>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="firstName"
              autoComplete="target-amount"
              label="First Name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="lastName"
              autoComplete="target-amount"
              label="Last name"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="email"
              autoComplete="target-amount"
              label="Email"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="phone"
              autoComplete="target-amount"
              label="Phone"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="company"
              autoComplete="target-amount"
              label="Company (optional)"
            />
          </Grid>
          <Grid item sm={5}>
            <FormTextField
              style={{ marginTop: '2%', width: '80%' }}
              type="text"
              name="adress"
              autoComplete="target-amount"
              label="Adress"
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '15%',
              marginTop: '1.1%',
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
