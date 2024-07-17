import { FormControl, Grid, Typography } from '@mui/material'
import { Field, useField } from 'formik'
import { useTranslation } from 'next-i18next'

import { StyledFormTextField, StyledStepHeading } from '../helpers/campaignApplication.styled'
import { CampaignEndTypes } from '../helpers/campaignApplication.types'
import CampaignTypeSelect from 'components/client/campaigns/CampaignTypeSelect'
import FormDatePicker from 'components/common/form/FormDatePicker'

import theme from 'common/theme'

export default function CampaignApplication() {
  const { t } = useTranslation('campaign-application')
  const [campaignEnd] = useField('application.campaignEnd')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.application.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <StyledFormTextField
            label={t('steps.application.beneficiary')}
            type="text"
            name="application.beneficiary"
            autoComplete="name"
          />
        </Grid>
        <Grid item xs={12}>
          <CampaignTypeSelect />
        </Grid>
        <Grid item xs={12}>
          <StyledFormTextField
            label={t('steps.application.funds')}
            type="number"
            name="application.funds"
          />
        </Grid>
        <Grid container item>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: theme.typography.pxToRem(16), paddingBottom: 2 }}>
              {t('steps.application.campaign-end.title')}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <FormControl>
              <Grid container item spacing={2} xs={12}>
                <Grid item xs={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="application.campaignEnd"
                      value={CampaignEndTypes.FUNDS}
                    />
                    {t('steps.application.campaign-end.options.funds')}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="application.campaignEnd"
                      value={CampaignEndTypes.ONGOING}
                    />
                    {t('steps.application.campaign-end.options.ongoing')}
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <label>
                    <Field
                      size="medium"
                      type="radio"
                      name="application.campaignEnd"
                      value={CampaignEndTypes.DATE}
                    />
                    {t('steps.application.campaign-end.options.date')}
                  </label>
                </Grid>
              </Grid>
              {campaignEnd.value === CampaignEndTypes.DATE && (
                <Grid item xs={6} sx={{ paddingTop: 2 }}>
                  <FormDatePicker name="application.campaign-end" label="" />
                </Grid>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
