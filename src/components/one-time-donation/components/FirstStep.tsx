import { Grid, Typography } from '@mui/material'
import { useSinglePriceList } from 'common/hooks/donation'
import FormTextField from 'components/common/form/FormTextField'
import RadioButtonGroup from 'components/common/form/RadioButtonGroup'
import { money } from 'common/util/money'
import { useTranslation } from 'next-i18next'
import React from 'react'
import CheckboxField from 'components/common/form/CheckboxField'
import theme from 'common/theme'

export default function FirstStep() {
  const { data: prices } = useSinglePriceList()
  const { t } = useTranslation('one-time-donation')
  return (
    <>
      <Grid container justifyContent="center">
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(4) }}>
          {t('first-step.wish')}
        </Typography>
      </Grid>
      <FormTextField
        name="message"
        type="text"
        label={t('first-step.message')}
        multiline
        rows={9}
      />
      <CheckboxField
        name="anonymous"
        label={<Typography fontWeight="bold">{t('first-step.check-box-label')}</Typography>}
      />
      <Typography variant="body1">{t('first-step.info-anonymous')}</Typography>
      <Typography variant="h4" sx={{ marginTop: theme.spacing(8) }}>
        {t('first-step.amount')}
      </Typography>
      <Grid marginTop={theme.spacing(4)}>
        <RadioButtonGroup
          name="amount"
          options={
            prices
              ?.sort((a, b) => Number(a.unit_amount) - Number(b.unit_amount))
              .map((v) => ({
                label: money(Number(v.unit_amount)),
                value: Number(v.unit_amount),
              })) || []
          }
        />
      </Grid>
    </>
  )
}
