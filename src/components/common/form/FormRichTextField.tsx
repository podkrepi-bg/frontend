import React from 'react'
import { Field, FieldInputProps, useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'

import 'react-quill/dist/quill.snow.css'

import ReactQuill, { Quill } from 'react-quill'

import BlotFormatter from 'quill-blot-formatter/'
Quill.register('modules/blotFormatter', BlotFormatter)

import htmlEditButton from 'quill-html-edit-button'
Quill.register({
  'modules/htmlEditButton': htmlEditButton,
})

export type RegisterFormProps = {
  name: string
}

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{ color: [] }],
    [{ background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  blotFormatter: {
    overlay: {
      style: {
        border: '2px solid red',
      },
    },
  },
  htmlEditButton: {},
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
          <ReactQuill
            modules={modules}
            theme="snow"
            value={field.value}
            onChange={field.onChange(field.name)}
          />
        )}
      </Field>
      {meta.touched && meta.error && (
        <Typography className="error" color="red">
          {helperText}
        </Typography>
      )}
    </div>
  )
}
