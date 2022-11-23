import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import FormTextField from './FormTextField'

export type FormProps = {
  label?: string
  name?: string
} & TextFieldProps

export default function PasswordField({
  name = 'password',
  label = 'auth:fields.password',
  ...props
}: FormProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((show) => !show)
  return (
    <FormTextField
      name={name}
      autoComplete="current-password"
      {...props}
      type={showPassword ? 'text' : 'password'}
      label={t(label)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}
