import React from 'react'
import { Field } from 'formik'
import { useTranslation } from 'next-i18next'

import { styled } from '@mui/system'
import { FormControl, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'

import Subtitle from '../helpers/Subtitle'

const TextFieldWrapper = styled(FormTextField)`
  fieldset {
    border-radius: 50px;
    border: 1px solid #909090;
    height: 40px;
  }
`
export default function CompanyBeneficiary() {
  const { t } = useTranslation('campaigns')

  return (
    <Grid container rowSpacing={4} justifyContent="center" direction="column" alignContent="center">
      <Subtitle label={t('steps.beneficiary.title-company')} />
      <Grid container item xs="auto" flexWrap="nowrap">
        <TextFieldWrapper
          label=""
          type="text"
          name="beneficiaryCompany.companyName"
          autoComplete="off"
          placeholder={t('steps.beneficiary-company.name')}
        />
        <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
      </Grid>
      <Grid container item xs="auto" flexWrap="nowrap">
        <TextFieldWrapper
          label=""
          type="text"
          name="beneficiaryCompany.address"
          autoComplete="off"
          placeholder={t('steps.beneficiary-company.country-code')}
        />
        <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
      </Grid>
      <Grid container item xs={12} flexWrap="nowrap">
        <TextFieldWrapper
          label=""
          type="text"
          name="beneficiaryCompany.companyNumber"
          autoComplete="off"
          placeholder={t('steps.beneficiary-company.number')}
        />
        <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="phone"
            name="beneficiaryCompany.phone"
            autoComplete="off"
            placeholder={t('steps.beneficiary-company.phone')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="email"
            name="beneficiaryCompany.email"
            autoComplete="off"
            placeholder={t('steps.beneficiary-company.email')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>
            {t('steps.beneficiary-company.person-info-msg')}
          </Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryCompany.legalPersonFirstName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-company.person-first-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryCompany.legalPersonMidName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-company.person-mid-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={4} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryCompany.legalPersonLastName"
            autoComplete="off"
            placeholder={t('steps.beneficiary-company.person-last-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent="center" direction="column">
        {/* <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.beneficiary.question')}</Typography>
        </Grid> */}
        {/* <Grid container item xs={12} justifyContent="center" direction="column">
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
        </Grid> */}
      </Grid>
    </Grid>
  )
}
