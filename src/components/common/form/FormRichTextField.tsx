import React, { useMemo, useRef } from 'react'
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

Quill.register({
  'modules/htmlEditButton': htmlEditButton,
})

export type FormRichTextFieldProps = {
  name: string
}

export default function FormRichTextField({ name }: FormRichTextFieldProps) {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const reactQuillRef = useRef<ReactQuill>(null)

  //this image handler inserts the image into the editor as URL to externally hosted image
  function handleImageUrlInsert() {
    let imageUrl = prompt('Enter the URL of the image:') // for a better UX find a way to use the Quill Tooltip or a Modal box
    if (!imageUrl) return
    const editor = reactQuillRef.current?.getEditor()
    if (!editor) return
    const unprivilegedEditor = reactQuillRef.current?.makeUnprivilegedEditor(editor)
    if (unprivilegedEditor) {
      //check if the link is from google drive and if so, change the link to a direct link
      const googleDriveLink = imageUrl.match(
        /https:\/\/drive.google.com\/file\/d\/(.*)\/view\?usp=share_link/,
      )
      if (googleDriveLink) {
        imageUrl = 'https://drive.google.com/uc?export=view&id=' + googleDriveLink[1]
      }

      const range = unprivilegedEditor.getSelection(true)
      editor.insertEmbed(range.index, 'image', imageUrl)
    }
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
          [{ color: [] }],
          [{ background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          [{ align: [] }],
          ['link', 'video', 'image'],
          ['clean'],
        ],
        handlers: { image: handleImageUrlInsert },
      },
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
    }),
    [],
  )

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
            ref={reactQuillRef}
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
