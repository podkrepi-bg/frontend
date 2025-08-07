import { Button, Grid2, Typography } from '@mui/material'
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
    subject: '',
    dateThreshold: new Date().toISOString(),
  }

  const validationSchema: yup.SchemaOf<SendNewsLetterConsent> = yup.object().defined().shape({
    templateId: yup.string().required(),
    listId: yup.string().required(),
    subject: yup.string().required(),
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
      subject: values.subject,
      dateThreshold: values.dateThreshold,
    }
    await mutation.mutateAsync(data)
    if (mutation.isSuccess && !mutation.isLoading) {
      formikHelpers.resetForm({ values: initialValues })
    }
  }

  return (
    <Grid2 container gap={2}>
      <Grid2>
        <Typography variant="h5" component="h2">
          {t('admin.sendConsentEmail')}
        </Typography>
      </Grid2>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid2 container spacing={3} size={12}>
          <Grid2 size={12}>
            <FormTextField type="text" label={t('admin.common.templateId')} name="templateId" />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField type="text" label={t('admin.common.listId')} name="listId" />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField type="text" label={t('admin.common.subject')} name="subject" />
          </Grid2>
          <Grid2
            container
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            size={12}>
            <Grid2
              size={{
                xs: 12,
                md: 6,
              }}>
              <Typography>Премахване от списък на потребители регистрирани след: </Typography>
            </Grid2>
            <FormDatePicker name="dateThreshold" label="" />
          </Grid2>
          <Grid2 size={12}>
            <SubmitButton label="Изпрати" fullWidth loading={mutation.isLoading} />
            <Link href={routes.admin.marketing.index} passHref>
              <Button fullWidth>{t('Откажи')}</Button>
            </Link>
          </Grid2>
        </Grid2>
      </GenericForm>
    </Grid2>
  )
}
