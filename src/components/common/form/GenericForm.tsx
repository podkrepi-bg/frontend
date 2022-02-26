import { Form, Formik, FormikConfig } from 'formik'
import React, { PropsWithChildren } from 'react'

export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export default function GenericForm<T>({ children, ...formProps }: GenericFormProps<T>) {
  return (
    <Formik<T> {...formProps}>
      <Form>{children}</Form>
    </Formik>
  )
}
