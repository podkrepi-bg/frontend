import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import { FormikProps } from 'formik'
import * as yup from 'yup'

import { translateError } from 'common/form/useForm'
import { SupportFormData } from '../types/SuportFormData'

type RolesProps = { formik: FormikProps<SupportFormData> }
export default function Roles({ formik }: RolesProps) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={'auto'} md={'auto'} lg={'auto'}>
        <FormControl required error={!!formik.errors.roles} component="fieldset">
          <h2>Как искате да ни подкрепите?</h2>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.benefactor}
                  onChange={formik.handleChange}
                  name="roles.benefactor"
                  color="primary"
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
                  color="primary"
                />
              }
              label="Партньор"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.volunteer}
                  onChange={formik.handleChange}
                  name="roles.volunteer"
                  color="primary"
                />
              }
              label="Доброволец"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.associationMember}
                  onChange={formik.handleChange}
                  name="roles.associationMember"
                  color="primary"
                />
              }
              label="Член на сдружението"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.roles.promoter}
                  onChange={formik.handleChange}
                  name="roles.promoter"
                  color="primary"
                />
              }
              label="Промотиране"
            />
          </FormGroup>
          {formik.errors.roles ? <FormHelperText>Изберете поне една роля</FormHelperText> : ''}
        </FormControl>
      </Grid>
    </Grid>
  )
}
