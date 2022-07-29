import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Divider, FormControl, FormGroup, FormHelperText, Grid, Typography } from '@mui/material'

import Role from './Role'
import HeaderTypography from '../helpers/HeaderTypography'

export default function Roles() {
  const [, { error }] = useField('roles')
  const { t } = useTranslation()

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12} md={8}>
        <HeaderTypography>{t('support:steps.role.subtitle')}</HeaderTypography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" paragraph>
          {t('support:steps.role.first-subtitle')}
        </Typography>
        <Divider />
        <FormControl fullWidth required error={!!error} component="fieldset">
          <FormGroup>
            <Role name="roles.benefactor" label={t('support:steps.role.fields.benefactor.title')} />
            <Role label={t('support:steps.role.fields.volunteer.title')} name="roles.volunteer" />
            <Role
              label={t('support:steps.role.fields.associationMember.title')}
              name="roles.associationMember"
            />
            <Role label={t('support:steps.role.fields.partner.title')} name="roles.partner" />
            <Role label={t('support:steps.role.fields.company.title')} name="roles.company" />
          </FormGroup>
          {error && <FormHelperText>{t('validation:select-role')}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  )
}
