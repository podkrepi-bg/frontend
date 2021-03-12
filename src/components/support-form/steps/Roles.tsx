import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { FormControl, FormGroup, FormHelperText, Grid, Typography } from '@material-ui/core'

import CheckboxField from 'components/common/form/CheckboxField'

export default function Roles() {
  const [, { error }] = useField('roles')
  const { t } = useTranslation()
  return (
    <Grid container spacing={6} justify="center">
      <Grid item xs={12} md={8}>
        <FormControl fullWidth required error={!!error} component="fieldset">
          <Typography variant="h4" align="center" paragraph>
            {t('common:support-form.steps.role.subtitle')}
          </Typography>
          <FormGroup>
            <CheckboxField
              label="common:support-form.steps.role.fields.benefactor"
              name="roles.benefactor"
            />
            <CheckboxField
              label="common:support-form.steps.role.fields.partner"
              name="roles.partner"
            />
            <CheckboxField
              label="common:support-form.steps.role.fields.volunteer"
              name="roles.volunteer"
            />
            <CheckboxField
              label="common:support-form.steps.role.fields.associationMember"
              name="roles.associationMember"
            />
            <CheckboxField
              label="common:support-form.steps.role.fields.promoter"
              name="roles.promoter"
            />
          </FormGroup>
          {error && <FormHelperText>{t('common:support-form.helperText')}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  )
}
