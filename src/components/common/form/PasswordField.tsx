import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextFieldProps } from '@mui/material'
import { useState } from 'react'
import FormTextField from './FormTextField'

export default function PasswordField({ name = 'password', ...props }: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = () => setShowPassword((show) => !show)
  return (
    <FormTextField
      name={name}
      {...props}
      type={showPassword ? 'text' : 'password'}
      autoComplete="current-password"
      label="auth:fields.password"
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
