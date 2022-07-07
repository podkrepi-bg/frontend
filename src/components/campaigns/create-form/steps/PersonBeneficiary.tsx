import React from 'react'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { FormControl, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'
import { OrganizerBeneficiaryRelation } from '../helpers/campaign-form.types'

const TextFieldWrapper = styled(FormTextField)`
  fieldset {
    border-radius: 50px;
    border: 1px solid #909090;
    height: 40px;
  }
`

export default function PersonBeneficiary() {
  const { t } = useTranslation('campaigns')

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.beneficiary.title-person')} />
      <Grid item container spacing={1} justifyContent="center" direction="column">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>
            {t('steps.beneficiary-person.question')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center" direction="column">
        <FormControl>
          <Grid container item xs={12} justifyContent="space-between" direction="row">
            <Grid item xs={12} md={5}>
              <label>
                <Field
                  type="radio"
                  name="organizerBeneficiaryRelation"
                  value={OrganizerBeneficiaryRelation.Related}
                />
                {t('steps.beneficiary-person.answer-for-me')}
              </label>
            </Grid>
            <Grid item xs={12} md={5}>
              <label>
                <Field
                  type="radio"
                  name="organizerBeneficiaryRelation"
                  value={OrganizerBeneficiaryRelation.NotRelated}
                />
                {t('steps.beneficiary-person.answer-for-other')}
              </label>
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryPerson.firstName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-person.first-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryPerson.midName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-person.mid-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryPerson.lastName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-person.last-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryPerson.personalNumber"
            placeholder={t('steps.beneficiary-person.personal-number')}
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
            name="beneficiaryPerson.email"
            autoComplete="off"
            placeholder={t('steps.beneficiary-person.email')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="phone"
            name="beneficiaryPerson.phone"
            autoComplete="off"
            placeholder={t('steps.beneficiary-person.phone')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
