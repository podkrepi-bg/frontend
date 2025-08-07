import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/material/styles'
import { Grid2, Typography } from '@mui/material'

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

export default function Contacts() {
  const { t } = useTranslation('irregularity')

  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  return (
    <Grid2 container spacing={4} alignContent="center">
      <Subtitle label={t('steps.contacts.subtitle')} />
      <Grid2 size={12}>
        <Typography variant="body1">
          {t('steps.contacts.text')}
          <Link href={routes.privacyPolicy}>
            <span>{t('steps.contacts.text-link') + '.'}</span>
          </Link>
        </Typography>
        <Typography visibility="hidden" variant="body1">
          {'helper'}
        </Typography>
      </Grid2>
      <Grid2 container spacing={4} justifyContent="space-between" direction="row">
        <Grid2
          container
          flexWrap="nowrap"
          size={{
            xs: 12,
            md: 6,
          }}>
          <CssTextField
            fullWidth
            label={t('steps.contacts.first-name')}
            type="text"
            name="person.firstName"
            autoComplete="off"
          />
        </Grid2>
        <Grid2
          container
          flexWrap="nowrap"
          size={{
            xs: 12,
            md: 6,
          }}>
          <CssTextField
            fullWidth
            label={t('steps.contacts.last-name')}
            type="text"
            name="person.lastName"
            autoComplete="off"
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={4} justifyContent="space-between" direction="row">
        <Grid2
          container
          flexWrap="nowrap"
          size={{
            xs: 12,
            md: 6,
          }}>
          <CssTextField
            fullWidth
            label={t('steps.contacts.phone')}
            type="phone"
            name="person.phone"
            autoComplete="off"
          />
        </Grid2>
        <Grid2
          container
          flexWrap="nowrap"
          size={{
            xs: 12,
            md: 6,
          }}>
          <CssTextField
            fullWidth
            label={t('steps.contacts.email')}
            type="email"
            name="person.email"
            autoComplete="off"
          />
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
