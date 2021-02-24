import { FormikConfig } from 'formik'
import React, { PropsWithChildren } from 'react'

import useForm from 'common/form/useForm'
import { FormContextProvider } from 'components/common/form/FormContext'

export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export default function GenericForm<T>({ children, ...formProps }: GenericFormProps<T>) {
  const { formik } = useForm<T>(formProps)

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormContextProvider<T> formik={formik}>{children}</FormContextProvider>
    </form>
  )
}
