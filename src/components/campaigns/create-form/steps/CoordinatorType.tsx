import React from 'react'
import { useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import CircleIcon from '@mui/icons-material/Circle'

import SubmitButton from 'components/common/form/SubmitButton'

import Subtitle from '../helpers/Subtitle'
import { CampaignFormData, CoordinatorTypes } from '../helpers/campaign-form.types'

const circleIconStyles = {
  width: '180px',
  height: '180px',
  color: '#C4C4C4',
}

const buttonStyles = {
  backgroundColor: '#ffffff',
  border: '1px solid #909090',
  borderRadius: '60px',
  width: '240px',
  color: '#000000',
  '&:hover': { backgroundColor: '#62C4FB', color: '#000000' },
}

const iconInfoStyles = {
  color: '#909090',
  fontSize: '18px',
}

const moreInfoStyles = {
  fontSize: '12px',
  lineHeight: '18px',
  textAlign: 'center',
  textDecorationLine: 'underline',
}

const typesTextStyles = {
  fontSize: '14px',
  lineHeight: '25px',
  textAlign: 'center',
}

export default function CoordinatorType() {
  const { t } = useTranslation()
  const { setFieldValue } = useFormikContext<CampaignFormData>()

  return (
    <Grid container spacing={3} justifyContent="center" direction="column" alignContent="center">
      <Grid item xs={12}>
        <Subtitle label={'campaigns:steps.coordinator-type.title'} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        spacing={4}
        justifyContent="space-around"
        direction="row"
        flexWrap="wrap">
        <Grid
          container
          item
          xs={12}
          sm={6}
          spacing={3}
          justifyContent="center"
          direction="column"
          flexWrap="nowrap"
          alignItems="center"
          alignContent="center">
          <Grid item xs={12}>
            <CircleIcon sx={circleIconStyles} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={typesTextStyles}>
              {t('campaigns:steps.coordinator-type.subtitle-person')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              onClick={() => {
                setFieldValue('coordinator', CoordinatorTypes.Person)
              }}
              sx={buttonStyles}
              label={'campaigns:steps.coordinator-type.btn-person'}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <InfoIcon sx={iconInfoStyles} />
            <Typography variant="body2" sx={moreInfoStyles}>
              {t('campaigns:steps.coordinator-type.more-info')}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          spacing={3}
          justifyContent="center"
          direction="column"
          flexWrap="nowrap"
          alignItems="center"
          alignContent="center">
          <Grid item xs={12}>
            <CircleIcon sx={circleIconStyles} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={typesTextStyles}>
              {t('campaigns:steps.coordinator-type.subtitle-company')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              onClick={() => {
                setFieldValue('coordinator', CoordinatorTypes.Company)
              }}
              sx={buttonStyles}
              label={'campaigns:steps.coordinator-type.btn-company'}
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <InfoIcon sx={iconInfoStyles} />
            <Typography variant="body2" sx={moreInfoStyles}>
              {t('campaigns:steps.coordinator-type.more-info')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
