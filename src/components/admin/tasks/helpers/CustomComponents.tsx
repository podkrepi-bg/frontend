import { FormControlLabel, Radio, TextField } from '@mui/material'
import { FieldHookConfig } from 'formik'
import React from 'react'
import { useField } from 'formik'

type MyRadioProps = { label: string } & FieldHookConfig<{}>

export const MyRadio = ({ label, ...props }: MyRadioProps) => {
  const [field] = useField<{}>(props)
  return <FormControlLabel {...field} control={<Radio />} label={label}></FormControlLabel>
}

export const MyTextField = ({ ...props }: any) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  console.log(field)
  return <TextField {...field} {...props} fullWidth helperText={errorText} error={!!errorText} />
}

function CustomComponents() {
  return <div></div>
}

export default CustomComponents
