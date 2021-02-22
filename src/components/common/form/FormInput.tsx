import { FormikValues } from 'formik'
import { Input, InputProps } from '@material-ui/core'

import { FormContextConsumer } from './FormContext'

type FormInputProps = InputProps & {
  name: string
}

export default function FormInput({ name, ...props }: FormInputProps) {
  return (
    <FormContextConsumer>
      {({ formik }: FormikValues) => <Input value={formik.values[name]} {...props} />}
    </FormContextConsumer>
  )
}
