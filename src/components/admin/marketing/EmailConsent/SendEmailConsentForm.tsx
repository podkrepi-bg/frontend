import { Button, Grid, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { routes } from 'common/routes'
import FormDatePicker from 'components/common/form/FormDatePicker'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { FormikHelpers } from 'formik'
import { NewsLetterConsentResponse, SendNewsLetterConsent } from 'gql/marketing'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { ApiError } from 'service/apiErrors'
import { useSendConsentEmail } from 'service/marketing'
import { AlertStore } from 'stores/AlertStore'
import * as yup from 'yup'

export default function SendConsentEmailForm() {
  const { t } = useTranslation('marketing')

  const initialValues: SendNewsLetterConsent = {
    templateId: '',
    listId: '',
    dateThreshold: new Date().toISOString(),
  }

  const validationSchema: yup.SchemaOf<SendNewsLetterConsent> = yup.object().defined().shape({
    templateId: yup.string().required(),
    listId: yup.string().required(),
    dateThreshold: yup.string().optional(),
  })

  const mutationFn = useSendConsentEmail()

  const handleError = (e: AxiosError<ApiError>) => {
    const error = e.response as AxiosResponse<ApiError>
    AlertStore.show(error.data.message, 'error')
  }

  const mutation = useMutation<
    AxiosResponse<NewsLetterConsentResponse>,
    AxiosError<ApiError>,
    SendNewsLetterConsent
  >({
    mutationFn,
    onError: (error) => handleError(error),
    onSuccess: (data) => {
      const response = data.data
      AlertStore.show(
        t(`Съобщението беше изпратен успешно на ${response.contactCount} емайла.`),
        'success',
      )
    },
  })

  async function onSubmit(
    values: SendNewsLetterConsent,
    formikHelpers: FormikHelpers<SendNewsLetterConsent>,
  ) {
    const data: SendNewsLetterConsent = {
      templateId: values.templateId,
      listId: values.listId,
      dateThreshold: values.dateThreshold,
    }
    await mutation.mutateAsync(data)
    if (mutation.isSuccess && !mutation.isLoading) {
      formikHelpers.resetForm({ values: initialValues })
    }
  }

  return (
    <Grid container gap={2}>
      <Grid item>
        <Typography variant="h5" component="h2">
          {t('admin.sendConsentEmail')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container item spacing={3} xs={12}>
          <Grid item xs={12}>
            <FormTextField type="text" label={t('admin.common.templateId')} name="templateId" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label={t('admin.common.listId')} name="listId" />
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Grid item xs={12} md={6}>
              <Typography>Премахване от списък на потребители регистрирани след: </Typography>
            </Grid>
            <FormDatePicker name="dateThreshold" label="" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton label="Изпрати" fullWidth loading={mutation.isLoading} />
            <Link href={routes.admin.marketing.index} passHref>
              <Button fullWidth>{t('Откажи')}</Button>
            </Link>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
