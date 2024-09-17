import React from 'react'
import { Field, FieldInputProps, useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import theme from 'common/theme'
import { styled } from '@mui/material/styles'

//import { ModernEditor } from './MDXEditor'
import { QuillEditor } from './QuillEditor'

export type FormRichTextFieldProps = {
  name: string
  fileUploadCallback?: (file: File) => Promise<string>
}

const StyledGrid = styled('div')(() => ({
  ['& .ql-toolbar.ql-snow']: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.palette.common.white,
  },
}))

// disabled as QuillEditor is default for now.
// const EditorSwitch = styled('div')(() => ({
//   display: 'flex',
//   justifyContent: 'flex-end',
// }))

export default function FormRichTextField({ name }: FormRichTextFieldProps) {
  const { t } = useTranslation()
  const [, meta] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  // disabling MDXEditor integration.
  // The markdown syntax does not support requirements like image and text alignment, colors, etc.
  //const [useMdxEditor, setUseMdxEditor] = React.useState(false)
  const useMdxEditor = false

  return (
    <div>
      <Field name={name}>
        {({ field }: { field: FieldInputProps<string> }) => (
          <StyledGrid>
            {/*
            <EditorSwitch>
              <label>
                <input
                  type="radio"
                  name="editor-type"
                  value="mdx"
                  checked={useMdxEditor}
                  onChange={() => setUseMdxEditor(true)}
                />{' '}
                {t('campaigns:campaign.rte.modern')}
              </label>
              <label>
                <input
                  type="radio"
                  name="editor-type"
                  value="quill"
                  checked={!useMdxEditor}
                  onChange={() => setUseMdxEditor(false)}
                />{' '}
                {t('campaigns:campaign.rte.classic')}
              </label>
            </EditorSwitch>
            */}

            {useMdxEditor ? (
              <>{/* <ModernEditor html={field.value} onChange={field.onChange(field.name)} /> */}</>
            ) : (
              <QuillEditor value={field.value} onChange={field.onChange(field.name)} />
            )}
          </StyledGrid>
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
