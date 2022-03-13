import React from 'react'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'
import { Divider, FormControl, FormGroup, FormHelperText, Grid, Typography } from '@mui/material'

import Role from './Role'
import { BankTransfer } from '../../common/BankTransfer'
import { useHeaderStyles } from '../helpers/header-styles'
import theme from 'common/theme'

export default function Roles() {
  const [, { error }] = useField('roles')
  const { t } = useTranslation()
  const classes = useHeaderStyles(theme)

  return (
    <Grid container spacing={6} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Typography variant="h4" align="center" paragraph className={classes.subtitleText}>
          {t('support:steps.role.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" paragraph>
          {t('support:steps.role.first-subtitle')}
        </Typography>
        <Divider />
        <div>
          <BankTransfer />
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h5" paragraph>
          {t('support:steps.role.second-subtitle')}
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
