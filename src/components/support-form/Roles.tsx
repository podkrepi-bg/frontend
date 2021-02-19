import React, { useState } from 'react'

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextField,
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { translateError } from 'common/form/useForm'
import * as yup from 'yup'

export default function Roles({ formik }: { formik: any }) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FormControl required error={formik.errors.roles} component="fieldset">
          <FormLabel component="legend">Как би поткрепил?</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.donate}
                  onChange={formik.handleChange}
                  name="roles.donate"
                />
              }
              label="Дарител"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.partner}
                  onChange={formik.handleChange}
                  name="roles.partner"
                />
              }
              label="Доброволец"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.media}
                  onChange={formik.handleChange}
                  name="roles.media"
                />
              }
              label="Популяризация"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.other}
                  onChange={formik.handleChange}
                  name="roles.other"
                />
              }
              label="Друго"
            />
          </FormGroup>
          {formik.errors.roles ? <FormHelperText>Изберете поне една роля</FormHelperText> : ''}
        </FormControl>
      </Grid>
    </Grid>
  )
}
