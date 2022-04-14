import React from 'react'
import { useTranslation } from 'next-i18next'
import { Field, useFormikContext } from 'formik'

import { styled } from '@mui/system'
import { FormControl, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'

import {
  CampaignDateTypes,
  CampaignFormData,
  CoordinatorBeneficiaryRealation,
} from '../helpers/campaign-form.types'
import Subtitle from '../helpers/Subtitle'
import SelectDate from '../helpers/SelectDate'
import CampaignTypeSelect from '../helpers/CampaignTypeSelect'

const TextFieldWrapper = styled(FormTextField)`
  fieldset {
    border-radius: 50px;
    border: 1px solid #909090;
    height: 40px;
  }
`

export default function CampaignGeneralInfo() {
  const { t } = useTranslation('campaigns')
  const { values } = useFormikContext<CampaignFormData>()

  return (
    <Grid container spacing={4} justifyContent="center" direction="column" alignContent="center">
      {values.coordinatorBeneficiaryRelation === CoordinatorBeneficiaryRealation.NotRelated && (
        <Grid container item xs={12} flexWrap="nowrap">
          <TextFieldWrapper
            label=""
            type="text"
            name="beneficiaryName"
            autoComplete="off"
            placeholder={t('steps.info.beneficiary-name')}
          />
          <Typography sx={{ color: 'red', fontSize: '18px' }}>*</Typography>
        </Grid>
      )}
      <Subtitle label={t('steps.info.title')} />
      <Grid container item spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.campaign-type')}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CampaignTypeSelect />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <FormTextField
          label=""
          type="text"
          fullWidth
          name="campaignInfo.campaignTypeName"
          disabled={values.campaignInfo.campaignTypeId !== 'else'}
          placeholder={t('steps.info.campaign-type-msg')}
        />
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.amount')}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextFieldWrapper
            label=""
            type="number"
            name="campaignInfo.targetAmount"
            autoComplete="off"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '18px' }}>{t('steps.info.date-title')}</Typography>
        </Grid>
        <Grid container item xs={12} md={6} direction="column" justifyContent="space-between">
          <FormControl>
            <Grid
              container
              item
              xs={12}
              justifyContent="space-around"
              flexWrap="nowrap"
              direction="column">
              <Grid item xs={6}>
                <label>
                  <Field
                    type="radio"
                    name="campaignInfo.campaignDate"
                    value={CampaignDateTypes.AmountReached}
                  />
                  {t('steps.info.date-amount-reached')}
                </label>
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Field
                    type="radio"
                    name="campaignInfo.campaignDate"
                    value={CampaignDateTypes.Continuous}
                  />
                  {t('steps.info.date-continuous')}
                </label>
              </Grid>
              <Grid item xs={6}>
                <label>
                  <Field
                    type="radio"
                    name="campaignInfo.campaignDate"
                    value={CampaignDateTypes.SelectDate}
                  />
                  {t('steps.info.date-end')}
                </label>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
        {values.campaignInfo.campaignDate === CampaignDateTypes.SelectDate && (
          <Grid item xs={4}>
            <SelectDate />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
