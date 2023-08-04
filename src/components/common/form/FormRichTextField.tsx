import React, { useMemo, useRef } from 'react'
import { Field, FieldInputProps, useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { translateError } from 'common/form/useForm'
import { TranslatableField } from 'common/form/validation'
import { styled } from '@mui/material/styles'

import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'

import BlotFormatter from 'quill-blot-formatter/'

import htmlEditButton from 'quill-html-edit-button'
import { ModernEditor } from './MDXEditor'

export type FormRichTextFieldProps = {
  name: string
}

const ImageFormatAttributesList = ['alt', 'height', 'width', 'style']

const BaseImageFormat = Quill.import('formats/image')
const BaseVideoFormat = Quill.import('formats/video')

type ImageProp = {
  [key: string]: string | null
}

class ImageFormat extends BaseImageFormat {
  static formats(domNode: HTMLElement) {
    return ImageFormatAttributesList.reduce(function (formats: ImageProp, attribute: string) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  format(name: string, value: string) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

class VideoFormat extends BaseVideoFormat {
  static formats(domNode: HTMLElement) {
    return ImageFormatAttributesList.reduce(function (formats: ImageProp, attribute: string) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute)
      }
      return formats
    }, {})
  }

  format(name: string, value: string) {
    if (ImageFormatAttributesList.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value)
      } else {
        this.domNode.removeAttribute(name)
      }
    } else {
      super.format(name, value)
    }
  }
}

Quill.register(ImageFormat, true)
Quill.register(VideoFormat, true)
Quill.register('modules/blotFormatter', BlotFormatter)
Quill.register({
  'modules/htmlEditButton': htmlEditButton,
})

Quill.register({
  'modules/htmlEditButton': htmlEditButton,
})

const StyledGrid = styled('div')(() => ({
  ['& .ql-toolbar.ql-snow']: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
}))

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
          <StyledGrid>
            <ModernEditor html={field.value} />
            {/*
            <ReactQuill
              ref={reactQuillRef}
              modules={modules}
              theme="snow"
              value={field.value}
              onChange={field.onChange(field.name)}
            />
*/}
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
