import React from 'react'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'

import Link from 'components/common/Link'
import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'

const CssTextField = styled(FormTextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    height: '40px',
  },
})

export default function Organizer() {
  const { t } = useTranslation('campaigns')

  return (
    <Grid container spacing={4} alignContent="center">
      <Subtitle label={t('steps.organizer.title')} />
      {/* <Grid item xs={12}>
        <Typography variant="body1" textAlign="justify">
          {t('steps.contacts.text')}
          <Link href={routes.privacyPolicy}>
            <span>{t('steps.contacts.text-link') + '.'}</span>
          </Link>
        </Typography>
        <Typography visibility="hidden" variant="body1">
          {'helper'}
        </Typography>
      </Grid> */}
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.organizer.first-name')}
            type="text"
            name="organizer.firstName"
            disabled={true}
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.organizer.last-name')}
            type="text"
            name="organizer.lastName"
            disabled={true}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.organizer.phone')}
            type="phone"
            name="organizer.phone"
            autoComplete="off"
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <CssTextField
            fullWidth
            label={t('steps.organizer.email')}
            type="email"
            name="organizer.email"
            disabled={true}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
