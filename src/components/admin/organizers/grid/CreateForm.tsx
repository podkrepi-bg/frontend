import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import PersonSelect from 'components/common/person/PersonSelect'
import { OrganizerInput, OrganizerResponse } from 'gql/organizer'
import { createOrganizer } from 'service/organizer'
import * as yup from 'yup'

const initialValues: OrganizerInput = {
  personId: '',
}

const validationSchema: yup.SchemaOf<OrganizerInput> = yup.object().shape({
  personId: yup.string().uuid().required(),
})

export default function CreateForm() {
  const { t } = useTranslation('organizer')
  const router = useRouter()

  const mutation = useMutation<
    AxiosResponse<OrganizerResponse>,
    AxiosError<ApiErrors>,
    OrganizerInput
  >({
    mutationFn: createOrganizer(),
    onError: () => AlertStore.show(t('admin.alerts.add-error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('admin.alerts.success'), 'success')
      router.push(routes.admin.organizers.index)
    },
  })

  const onSubmit = (data: OrganizerInput) => {
    mutation.mutate(data)
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('admin.create.heading')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ textAlign: 'center', padding: '8px' }}>
          {t('admin.create.info')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PersonSelect name="personId" label={t('admin.create.personSelect')} />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              label={t('admin.create.submitButton')}
              loading={mutation.isLoading}
            />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
