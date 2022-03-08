import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { Container } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors, isAxiosError, matchValidator } from '../../service/apiErrors'
import { Bootcamp, BootcampEdit, BootcampInput, editTask } from './survices/bootcampSurvices'
import BootcampLayout from './BootcampLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import BootcampForm from './Form'
import { useState } from 'react'

type BootcampFormProps = { values: BootcampEdit }

export default function EditPage({ values }: BootcampFormProps) {
  const defaults: BootcampInput = {
    status: values.status,
    title: values.title,
    email: values.email,
    message: values.message,
    date: values.date.substring(0, 10),
    firstName: values.firstName,
    lastName: values.lastName,
  }

  const mutation = useMutation<AxiosResponse<Bootcamp>, AxiosError<ApiErrors>, BootcampEdit>({
    mutationFn: editTask,
    onError: () => AlertStore.show(t('bootcamp:alerts.new-row.error'), 'error'),
    onSuccess: () => AlertStore.show('g', 'success'),
  })
  const { t } = useTranslation()
  const router = useRouter()
  const [status, setStatus] = useState(defaults.status)

  const onSubmit = async (
    value: BootcampInput,
    { setFieldError, resetForm }: FormikHelpers<BootcampInput>,
  ) => {
    try {
      const data: BootcampEdit = {
        id: values.id,
        status: status,
        title: value.title,
        email: value.email,
        message: value.message,
        date: new Date(value.date).toISOString(),
        firstName: value.firstName,
        lastName: value.lastName,
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
          <BootcampForm
            defaults={defaults}
            handle={onSubmit}
            edit={true}
            setStatus={setStatus}
            status={status}
          />
        </Container>
      </AdminContainer>
    </BootcampLayout>
  )
}
