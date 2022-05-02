import React from 'react'

import { Grid, Typography } from '@mui/material'

import Subtitle from '../helpers/Subtitle'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/system'
import Link from 'components/common/Link'
import { routes } from 'common/routes'

const CssTextField = styled(FormTextField)({
  '& label': {
    marginLeft: '8px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    // border: '1px solid #909090',
    height: '40px',
    margin: '7px',
  },
})

export default function Contacts() {
  const { t } = useTranslation('irregularity-report')

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.contacts.subtitle')} />
      <Grid item xs={12}>
        <Typography variant="body1" textAlign="justify">
          {t('steps.contacts.text')}
          <Link href={routes.privacyPolicy}>
            <span>{t('steps.contacts.text-link')}</span>
          </Link>
        </Typography>
        <Typography visibility="hidden" variant="body1">
          {'helper'}
        </Typography>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.contacts.first-name')}
            type="text"
            name="person.firstName"
            autoComplete="off"
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.contacts.last-name')}
            type="text"
            name="person.lastName"
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.contacts.phone')}
            type="phone"
            name="person.phone"
            autoComplete="off"
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.contacts.email')}
            type="email"
            name="person.email"
            autoComplete="off"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
