import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { FormControl, FormGroup, FormHelperText, Grid, Typography } from '@material-ui/core'

import Role from './Role'

export default function Roles() {
  const [, { error }] = useField('roles')
  const { t } = useTranslation()
  return (
    <Grid container spacing={6} justify="center">
      <Grid item xs={12} md={8}>
        <FormControl fullWidth required error={!!error} component="fieldset">
          <Typography variant="h4" align="center" paragraph>
            {t('support:steps.role.subtitle')}
          </Typography>
          <FormGroup>
            <Role
              name="roles.benefactor"
              label={t('support:steps.role.fields.benefactor.title')}
              description={t('support:steps.role.fields.benefactor.description')}></Role>
            <Role
              label={t('support:steps.role.fields.partner.title')}
              name="roles.partner"
              description={t('support:steps.role.fields.partner.description')}></Role>
            <Role
              label={t('support:steps.role.fields.volunteer.title')}
              name="roles.volunteer"
              description={t('support:steps.role.fields.volunteer.description')}></Role>
            <Role
              label={t('support:steps.role.fields.associationMember.title')}
              name="roles.associationMember"
              description={t('support:steps.role.fields.volunteer.description')}></Role>
            <Role
              label={t('support:steps.role.fields.promoter.title')}
              name="roles.promoter"
              description={t('support:steps.role.fields.promoter.description')}></Role>
          </FormGroup>
          {error && <FormHelperText>{t('validation:select-role')}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  )
}
