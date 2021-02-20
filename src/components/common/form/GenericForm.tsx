import React from 'react'
import useForm from 'common/form/useForm'
import { FormContextProvider } from 'components/common/form/FormContext'

export type GenericFormProps = {
  onSubmit: any
  initialValues?: any
  validationSchema: any
  children: any
}

const GenericForm = (props: GenericFormProps) => {
  const { initialValues, onSubmit, validationSchema, children } = props
  const { formik } = useForm({ initialValues, onSubmit, validationSchema })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormContextProvider value={formik}>{children}</FormContextProvider>
    </form>
  )
}

export default GenericForm
