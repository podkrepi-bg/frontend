import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormLabel, Grid, TextField } from '@material-ui/core'
import { FormikProps } from 'formik'

import { translateError } from 'common/form/useForm'
import { SupportFormData } from '../types/SuportFormData'

type GeneralInfoProps = { formik: FormikProps<SupportFormData> }

export default function GeneralInfo({ formik }: GeneralInfoProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>Как да се свържем с вас?</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={'Email'}
            name="info.email"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.email)}
            helperText={translateError(formik.errors.info?.email)}
            value={formik.values.info.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={'Name'}
            name="info.name"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.name)}
            helperText={translateError(formik.errors.info?.name)}
            value={formik.values.info.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={'Phone'}
            name="info.phone"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.phone)}
            helperText={translateError(formik.errors.info?.phone)}
            value={formik.values.info.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={'Address'}
            name="info.address"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.address)}
            helperText={translateError(formik.errors.info?.address)}
            value={formik.values.info.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    </>
  )
}
