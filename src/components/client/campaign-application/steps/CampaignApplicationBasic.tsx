import { FormControl, Grid2, Typography } from '@mui/material'
import { Field, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import CampaignTypeSelect from 'components/client/campaigns/CampaignTypeSelect'
import FormDatePicker from 'components/common/form/FormDatePicker'
import { StyledFormTextField, StyledStepHeading } from '../helpers/campaignApplication.styled'
import { CampaignApplicationFormData, CampaignEndTypes } from '../helpers/campaignApplication.types'

import theme from 'common/theme'
import { useEffect, useState } from 'react'

export default function CampaignApplicationBasic() {
  const { t } = useTranslation('campaign-application')
  const { values, setFieldValue } = useFormikContext<CampaignApplicationFormData>()
  // if user selects the date we'll fill in the previously selected (or new Date()) or remove that in case they chose another option
  const [selectedDate, setSelectedDate] = useState(
    values?.applicationBasic?.campaignEndDate ?? new Date().toString(),
  )
  useEffect(() => {
    const endDate = values.applicationBasic?.campaignEndDate
    if (endDate != null && endDate != selectedDate) {
      setSelectedDate(endDate)
    }
    setFieldValue(
      'applicationBasic.campaignEndDate',
      values?.applicationBasic?.campaignEnd === CampaignEndTypes.DATE ? selectedDate : undefined,
      false,
    )
  }, [values?.applicationBasic?.campaignEnd])

  return (
    <Grid2 container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid2 container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.application.title')}</StyledStepHeading>
      </Grid2>
      <Grid2 container spacing={6} justifyContent="space-between" direction="row">
        <Grid2 size={12}>
          <StyledFormTextField
            label={t('steps.application.beneficiary')}
            type="text"
            name="applicationBasic.beneficiaryNames"
            autoComplete="name"
          />
        </Grid2>
        <Grid2 size={12}>
          <StyledFormTextField
            label={t('steps.application.beneficiaryRelationship')}
            type="text"
            name="applicationBasic.organizerBeneficiaryRelationship"
          />
        </Grid2>
        <Grid2 size={12}>
          <StyledFormTextField
            label={t('steps.application.campaignTitle')}
            type="text"
            name="applicationBasic.title"
          />
        </Grid2>
        <Grid2 size={12}>
          <CampaignTypeSelect name="applicationBasic.campaignType" hideSystemTypes={true} />
        </Grid2>
        <Grid2 size={12}>
          <StyledFormTextField
            label={t('steps.application.funds')}
            type="number"
            name="applicationBasic.funds"
          />
        </Grid2>
        <Grid2 container>
          <Grid2 size={12}>
            <Typography sx={{ fontSize: theme.typography.pxToRem(16), paddingBottom: 2 }}>
              {t('steps.application.campaign-end.title')}
            </Typography>
          </Grid2>
          <Grid2 container size={12}>
            <FormControl>
              <Grid2 container spacing={2} size={12}>
                <Grid2 size={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="applicationBasic.campaignEnd"
                      value={CampaignEndTypes.FUNDS}
                    />
                    {t('steps.application.campaign-end.options.funds')}
                  </label>
                </Grid2>
                <Grid2 size={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="applicationBasic.campaignEnd"
                      value={CampaignEndTypes.ONGOING}
                    />
                    {t('steps.application.campaign-end.options.ongoing')}
                  </label>
                </Grid2>
                <Grid2 size={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="applicationBasic.campaignEnd"
                      value={CampaignEndTypes.DATE}
                    />
                    {t('steps.application.campaign-end.options.date')}
                  </label>
                </Grid2>
              </Grid2>
              {values?.applicationBasic?.campaignEnd === CampaignEndTypes.DATE &&
                values?.applicationBasic?.campaignEndDate != null && (
                  <Grid2 sx={{ paddingTop: 2 }} size={6}>
                    <FormDatePicker name="applicationBasic.campaignEndDate" label="" />
                  </Grid2>
                )}
            </FormControl>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
