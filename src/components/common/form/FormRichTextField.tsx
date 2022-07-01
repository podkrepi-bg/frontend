import React from 'react'
import { Field, FieldInputProps, useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export type RegisterFormProps = {
  name: string
}

export default function FormRichTextField({ name }: RegisterFormProps) {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <div>
      {meta.touched && meta.error && (
        <Typography className="error" color="red">
          {helperText}
        </Typography>
      )}
      <Field name={name}>
        {({ field }: { field: FieldInputProps<string> }) => (
          <ReactQuill theme="snow" value={field.value} onChange={field.onChange(field.name)} />
        )}
      </Field>
    </div>
  )
}
