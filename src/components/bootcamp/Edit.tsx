import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { Container } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors, isAxiosError, matchValidator } from '../../service/apiErrors'
import { Bootcamp, BootcampInput, createTask } from './survices/bootcampSurvices'
import BootcampLayout from './BootcampLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import BootcampForm from './Form'

type BootcampFormProps = { values: BootcampInput }

export default function EditPage({ values }: BootcampFormProps) {
  const defaults: BootcampInput = {
    status: values.status,
    title: values.title,
    email: values.email,
    message: values.message,
    date: values.date.substring(0, 10),
  }

  const mutation = useMutation<AxiosResponse<Bootcamp>, AxiosError<ApiErrors>, BootcampInput>({
    mutationFn: createTask,
    onError: () => AlertStore.show(t('bootcamp:alerts.new-row.error'), 'error'),
    onSuccess: () => AlertStore.show('g', 'success'),
  })
  const { t } = useTranslation()
  const router = useRouter()

  const onSubmit = async (
    values: BootcampInput,
    { setFieldError, resetForm }: FormikHelpers<BootcampInput>,
  ) => {
    try {
      const data = {
        status: values.status,
        title: values.title,
        email: values.email,
        message: values.message,
        date: new Date(values.date).toISOString(),
      }
      await mutation.mutateAsync(data)
      resetForm()
      router.push('/bootcamp')
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
    <BootcampLayout>
      <AdminContainer title={t('bootcamp:form.edit-intern')}>
        <Container>
          <BootcampForm defaults={defaults} handle={onSubmit} edit={true} />
        </Container>
      </AdminContainer>
    </BootcampLayout>
  )
}
