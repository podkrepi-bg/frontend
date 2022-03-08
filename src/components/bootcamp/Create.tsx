import React from 'react'
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

export default function CreateForm() {
  const defaults: BootcampInput = {
    status: 'todo',
    title: '',
    email: '',
    message: '',
    date: '',
    firstName: '',
    lastName: '',
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
        firstName: values.firstName,
        lastName: values.lastName,
      }
      await mutation.mutateAsync(data)
      resetForm()
      router.push('/bootcamp')
    } catch (error) {
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
      <AdminContainer title={t('bootcamp:titles.bootcamp-add')}>
        <Container>
          <BootcampForm defaults={defaults} handle={onSubmit} edit={false} />
        </Container>
      </AdminContainer>
    </BootcampLayout>
  )
}
