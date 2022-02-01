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
import { editBootcamp, editBootcampDimitar } from 'common/rest'
import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material'
import Layout from './layout/Layout'
import { routes } from 'common/routes'

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

export default function EditForm({ data }: { data: any }) {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: editBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('Success'), 'success'),
  })

  const onSubmit = async (values: any, { setFieldError, resetForm }: FormikHelpers<any>) => {
    try {
      await mutation.mutateAsync({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        id: router.query.id,
      })
      // resetForm()
      router.push('/bootcamps')
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
    <>
      <Layout></Layout>
      <Container maxWidth="sm">
        <Grid container direction="column" component="section">
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" className={classes.heading}>
              Edit
            </Typography>
          </Grid>
          <GenericForm onSubmit={onSubmit} initialValues={data}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField type="text" label="First name" name="firstName" autoComplete="name" />
              </Grid>
              <Grid item xs={12}>
                <FormTextField type="text" label="Last name" name="lastName" autoComplete="name" />
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup alignItems="center">
                  <SubmitButton
                    fullWidth
                    label="campaigns:cta.submit"
                    loading={mutation.isLoading}
                  />
                  <Button onClick={() => router.push(routes.bootcamps.home)}>Cancel</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </>
  )
}
