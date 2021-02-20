import React from 'react'
import { TextField } from '@material-ui/core'
import { FormContextConsumer } from 'components/common/form/FormContext'
import { translateError } from 'common/form/useForm'

export type RegisterFormProps = {
  type: string
  label: string
  name: string
  translate: any
}

const FormTextField = ({ type, label, name, translate }: RegisterFormProps) => {
  return (
    <FormContextConsumer>
      {({ formik }: any) => (
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
