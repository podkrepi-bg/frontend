import React from 'react'
import FormTextField, { RegisterFormProps } from './FormTextField'

export type EmailFieldProps = Omit<RegisterFormProps, 'type'> & {
  type?: string
}

export default function EmailField(props: EmailFieldProps) {
  return <FormTextField inputMode="email" autoComplete="email" type="email" {...props} />
}
