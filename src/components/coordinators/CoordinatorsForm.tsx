import React from 'react'
import { useRouter } from 'next/router'
import createStyles from '@mui/styles/createStyles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { CoorinatorInput, CoordinatorResponse } from 'gql/coordinators'
import { useCreateCoordinatorRequest } from 'service/coordinator'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'service/apiErrors'
import { routes } from 'common/routes'
import CoordinatorCreateSelect from './CoordinatorCreateSelect'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

export default function CoordinatorsForm() {
  const classes = useStyles()
  const { t } = useTranslation()
  const router = useRouter()

  const initialValues: CoorinatorInput = {
    personId: '',
  }

  const mutation = useMutation<
    AxiosResponse<CoordinatorResponse>,
    AxiosError<ApiErrors>,
    CoorinatorInput
  >({
    mutationFn: useCreateCoordinatorRequest(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.saved'), 'success')
      router.push(routes.admin.coordinators.index)
    },
  })

  const onSubmit = (data: CoorinatorInput) => {
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('coordinator:create:heading')}
        </Typography>
      </Grid>
      <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CoordinatorCreateSelect></CoordinatorCreateSelect>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SubmitButton
            fullWidth
            label={t('coordinator:create:submitButton')}
            loading={mutation.isLoading}
          />
        </Grid>
      </GenericForm>
    </Grid>
  )
}
