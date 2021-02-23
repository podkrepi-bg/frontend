import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { FormikProps } from 'formik'

import { translateError } from 'common/form/useForm'
import { SupportFormData } from '../helpers/support-form.models'

type GeneralInfoProps = { formik: FormikProps<SupportFormData> }

export default function GeneralInfo({ formik }: GeneralInfoProps) {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" paragraph>
          {t('common:support-form.steps.info.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          fullWidth
          label={t('common:support-form.steps.info.email')}
          name="info.email"
          autoComplete="email"
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
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          fullWidth
          label={t('common:support-form.steps.info.name')}
          name="info.name"
          autoComplete="name"
          size="small"
          variant="outlined"
          error={Boolean(formik.errors.info?.name) && formik.touched.info?.name}
          helperText={formik.touched.info?.name ? translateError(formik.errors.info?.name, t) : ''}
          value={formik.values.info.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          fullWidth
          label={t('common:support-form.steps.info.phone')}
          name="info.phone"
          autoComplete="phone"
          size="small"
          variant="outlined"
          error={Boolean(formik.errors.info?.phone) && formik.touched.info?.phone}
          helperText={
            formik.touched.info?.phone ? translateError(formik.errors.info?.phone, t) : ''
          }
          value={formik.values.info.phone}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          type="text"
          fullWidth
          label={t('common:support-form.steps.info.address')}
          name="info.address"
          autoComplete="address"
          size="small"
          variant="outlined"
          error={Boolean(formik.errors.info?.address) && formik.touched.info?.address}
          helperText={
            formik.touched.info?.address ? translateError(formik.errors.info?.address, t) : ''
          }
          value={formik.values.info.address}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Grid>
      <Grid container direction="column" alignItems="flex-end">
        <Grid item xs={12}>
          <FormControl required error={!!formik.errors.terms} component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  name="terms"
                  color="primary"
                />
              }
              label={t('common:support-form.steps.info.terms')}
            />
          </FormControl>
          {formik.errors.terms ? (
            <FormHelperText error={true}>{t('common:support-form.termsHelperText')}</FormHelperText>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}
