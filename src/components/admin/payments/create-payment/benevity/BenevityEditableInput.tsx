import { IconButton, TextField } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { useEffect, useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'

export const BenevityInput = ({
  name,
  suffix,
  canEdit = false,
}: {
  name: string
  suffix?: string
  canEdit?: boolean
}) => {
  const { t } = useTranslation()
  const [editable, setEditable] = useState(false)
  const [field, meta, { setValue }] = useField(name)
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editable) return
    const child = ref.current
    child?.focus()
  }, [editable])

  const toggleEdit = () => {
    setEditable((prev) => !prev)
  }
  const onBlur = (
    formikBlur: typeof field.onBlur,
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    formikBlur(e)
    toggleEdit()
  }

  return (
    <TextField
      helperText={helperText}
      error={Boolean(meta.error) && Boolean(meta.touched)}
      variant="standard"
      id={field.name}
      type="text"
      {...field}
      onBlur={(e) => onBlur(field.onBlur, e)}
      InputProps={{
        disableUnderline: !editable,
        inputRef: ref,
        disabled: !editable,
        sx: {
          '& .MuiInputBase-input.Mui-disabled': {
            WebkitTextFillColor: '#000000',
          },
          '& .MuiInputBase-input': {
            width: `${String(field.value).length + 1}ch`,
            maxWidth: !editable ? `12ch` : 'auto',
          },
        },
        endAdornment: (
          <>
            {suffix && <span>{suffix}</span>}
            {canEdit && (
              <IconButton size="small" onClick={toggleEdit} sx={{ color: 'primary.light' }}>
                <EditIcon />
              </IconButton>
            )}
          </>
        ),
      }}
    />
  )
}
