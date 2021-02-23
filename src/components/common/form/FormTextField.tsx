import React from 'react'
import { FormikProps } from 'formik'
import { TextField } from '@material-ui/core'
import { FormContextConsumer } from 'components/common/form/FormContext'
import { translateError } from 'common/form/useForm'
import { TFunction } from 'react-i18next'
import { TranslatableField } from 'common/form/validation'

export type RegisterFormProps = {
  type: string
  label: string
  name: string
  translate: TFunction
}
type FormikType = {
  [key: string]: FormikProps<any>
}
const FormTextField = ({ type, label, name, translate }: RegisterFormProps) => {
  return (
    <FormContextConsumer>
      {({ formik }: FormikType) => (
        <TextField
          type={type}
          fullWidth
          label={translate(label)}
          name={name}
          size="small"
          variant="outlined"
          error={Boolean(formik.errors[name]) && !!formik.touched[name]}
          helperText={
            formik.touched[name]
              ? translateError(formik.errors[name] as TranslatableField, translate)
              : ''
          }
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      )}
    </FormContextConsumer>
  )
}

export default FormTextField
