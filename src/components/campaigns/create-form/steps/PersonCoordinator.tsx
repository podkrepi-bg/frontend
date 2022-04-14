import React from 'react'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { FormControl, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'
import { CoordinatorBeneficiaryRealation } from '../helpers/campaign-form.types'

const TextFieldWrapper = styled(FormTextField)`
  fieldset {
    border-radius: 50px;
    border: 1px solid #909090;
    height: 40px;
  }
`

export default function PersonCoordinator() {
  const { t } = useTranslation('campaigns')

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.coordinator.title-person')} />
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="coordinatorPerson.firstName"
            autoComplete="off"
            placeholder={t('steps.coordinator-person.first-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="coordinatorPerson.midName"
            autoComplete="off"
            placeholder={t('steps.coordinator-person.mid-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="coordinatorPerson.lastName"
            autoComplete="off"
            placeholder={t('steps.coordinator-person.last-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="coordinatorPerson.personalNumber"
            placeholder={t('steps.coordinator-person.personal-number')}
            autoComplete="off"
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="email"
            name="coordinatorPerson.email"
            autoComplete="off"
            placeholder={t('steps.coordinator-person.email')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="phone"
            name="coordinatorPerson.phone"
            autoComplete="off"
            placeholder={t('steps.coordinator-person.phone')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent="center" direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.coordinator.question')}</Typography>
        </Grid>
        <Grid container item xs={12} justifyContent="center" direction="column">
          <FormControl>
            <Grid container item xs={12} justifyContent="space-between" direction="row">
              <Grid item xs={12} md={5}>
                <label>
                  <Field
                    type="radio"
                    name="coordinatorBeneficiaryRelation"
                    value={CoordinatorBeneficiaryRealation.Related}
                  />
                  {t('steps.coordinator.answer-for-us')}
                </label>
              </Grid>
              <Grid item xs={12} md={5}>
                <label>
                  <Field
                    type="radio"
                    name="coordinatorBeneficiaryRelation"
                    value={CoordinatorBeneficiaryRealation.NotRelated}
                  />
                  {t('steps.coordinator.answer-for-others')}
                </label>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  )
}
