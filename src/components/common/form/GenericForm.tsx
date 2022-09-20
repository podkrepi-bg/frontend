import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import React, { PropsWithChildren } from 'react'

export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export default function GenericForm<T extends FormikValues>({
  children,
  ...formProps
}: GenericFormProps<T>) {
  return (
    <Formik<T> {...formProps}>
      <Form>{children}</Form>
    </Formik>
  )
}
