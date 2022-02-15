import { Grid } from '@mui/material'
import GenericForm from 'components/common/form/GenericForm'
import MainLayout from '../layout/MainLayout'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { InfoRequest, InfoRequestInput } from 'common/hooks/infoRequest'
import { ApiErrors } from 'common/api-errors'
import { AlertStore } from 'stores/AlertStore'
import { createInfoRequest } from 'common/rest'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'

function InfoRequestCreateForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const { keycloak } = useKeycloak<KeycloakInstance>()

  const mutation = useMutation<AxiosResponse<InfoRequest>, AxiosError<ApiErrors>, InfoRequestInput>(
    {
      mutationFn: createInfoRequest(keycloak?.token),
      onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
      onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
    },
  )

  const onSubmit = (values: { message: string }) => {
    mutation.mutateAsync(values).then(() => {
      router.push('/admin/info-request')
    })
  }

  return (
    <MainLayout>
      <div style={{ margin: '0 auto', width: '70%' }}>
        <GenericForm onSubmit={onSubmit} initialValues={{ message: '' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormTextField
                rows={5}
                multiline
                type="text"
                name="message"
                label="message"
                autoComplete="message"
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton fullWidth label="Submit" />
            </Grid>
          </Grid>
        </GenericForm>
      </div>
    </MainLayout>
  )
}

export default InfoRequestCreateForm
