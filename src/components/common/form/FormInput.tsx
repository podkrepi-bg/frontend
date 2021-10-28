import { useField } from 'formik'
import { Input, InputProps } from '@mui/material'

type FormInputProps = InputProps & {
  name: string
}

export default function FormInput({ name, ...props }: FormInputProps) {
  const [field] = useField(name)
  return <Input {...field} {...props} />
}
