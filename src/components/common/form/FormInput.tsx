import { FormikValues } from 'formik'
import { Input, InputProps } from '@material-ui/core'

import { useFormContext } from './FormContext'

type FormInputProps = InputProps & {
  name: string
}

export default function FormInput<T extends FormikValues>({ name, ...props }: FormInputProps) {
  const { formik } = useFormContext<T>()
  return <Input value={formik.values[name]} {...props} />
}
