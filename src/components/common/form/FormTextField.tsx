import React from 'react'
import { FormikValues } from 'formik'
import { TextField } from '@material-ui/core'
import { FormContextConsumer } from 'components/common/form/FormContext'
import { translateError } from 'common/form/useForm'
import { TFunction } from 'react-i18next'

export type RegisterFormProps = {
  type: string
  label: string
  name: string
  translate: TFunction
}

const FormTextField = ({ type, label, name, translate }: RegisterFormProps) => {
  return (
    <FormContextConsumer>
      {({ formik }: FormikValues) => (
        <TextField
          type={type}
          fullWidth
          label={translate(label)}
          name={name}
          size="small"
          variant="outlined"
          error={Boolean(formik.errors[name])}
          helperText={translateError(formik.errors[name], translate)}
          value={formik.values[name]}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      )}
    </FormContextConsumer>
  )
}

export default FormTextField
