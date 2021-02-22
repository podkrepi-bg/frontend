import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormLabel, Grid, TextField } from '@material-ui/core'
import { FormikProps } from 'formik'

import { translateError } from 'common/form/useForm'
import { SupportFormData } from '../helpers/support-form.models'

type GeneralInfoProps = { formik: FormikProps<SupportFormData> }

export default function GeneralInfo({ formik }: GeneralInfoProps) {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('common:support-form.steps.info.subtitle')}</h2>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={t('common:support-form.steps.info.email')}
            name="info.email"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.email) && formik.touched.info?.email}
            helperText={
              formik.touched.info?.email ? translateError(formik.errors.info?.email, t) : ''
            }
            value={formik.values.info.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={t('common:support-form.steps.info.name')}
            name="info.name"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.name) && formik.touched.info?.name}
            helperText={
              formik.touched.info?.name ? translateError(formik.errors.info?.name, t) : ''
            }
            value={formik.values.info.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={t('common:support-form.steps.info.phone')}
            name="info.phone"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.phone) && formik.touched.info?.phone}
            helperText={
              formik.touched.info?.phone ? translateError(formik.errors.info?.phone, t) : ''
            }
            value={formik.values.info.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            fullWidth
            label={t('common:support-form.steps.info.address')}
            name="info.address"
            size="small"
            variant="outlined"
            autoFocus
            error={Boolean(formik.errors.info?.address) && formik.touched.info?.address}
            helperText={
              formik.touched.info?.address ? translateError(formik.errors.info?.address, t) : ''
            }
            value={formik.values.info.address}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </Grid>
      </Grid>
    </>
  )
}
