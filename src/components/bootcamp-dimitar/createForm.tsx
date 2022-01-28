import React from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { createBootcampDimitar } from 'common/rest'
import { Grid, Typography } from '@mui/material'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    message: {
      '& textarea': { resize: 'vertical' },
    },
  }),
)

export default function CreateForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: createBootcampDimitar,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('Success'), 'success'),
  })

  const onSubmit = async (values: any, { setFieldError, resetForm }: FormikHelpers<any>) => {
    console.log(values)
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        company: values.company,
      })
      resetForm()
      router.push('/bootcamp-dimitar')
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          Create
        </Typography>
      </Grid>
      <GenericForm onSubmit={onSubmit} initialValues={{ firstName: '', lastName: '', company: '' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField type="text" label="First name" name="firstName" autoComplete="name" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Last name" name="lastName" autoComplete="name" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Company" name="company" autoComplete="company" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
