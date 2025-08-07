import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Grid2, Typography } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'

import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { useCreateCoordinator } from 'service/coordinator'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { CoorinatorInput, CoordinatorResponse } from 'gql/coordinators'

import PersonSelect from 'components/common/person/PersonSelect'

export default function CoordinatorsForm() {
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
    mutationFn: useCreateCoordinator(),
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
          {t('coordinator:create:heading')}
        </Typography>
      </Grid2>
      <Grid2 size={12}>
        <Typography variant="body1" sx={{ textAlign: 'center', padding: '8px' }}>
          {t('coordinator:create:info')}
        </Typography>
      </Grid2>
      <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <PersonSelect name="personId" label={t('coordinator:create:personSelect')} />
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <SubmitButton
            fullWidth
            label={t('coordinator:create:submitButton')}
            loading={mutation.isLoading}
          />
        </Grid2>
      </GenericForm>
    </Grid2>
  );
}
