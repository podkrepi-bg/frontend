import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { useSinglePriceList } from 'common/hooks/donation'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'
import React from 'react'
import CheckboxField from './FormCheckField'
import PriceRadioGroup from './PriceRadioGroup'

const useStyles = makeStyles(() =>
  createStyles({
    h3: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '25px',
      lineHeight: '116.7%',
      color: '#343434',
      marginTop: '91px',
      marginBottom: '25px',
      textAlign: 'left',
    },
    message: {
      background: '#FFFFFF',
      borderRadius: '32px',
      textAlign: 'left',
    },
  }),
)
export default function FirstStep() {
  const classes = useStyles()
  const { data: prices } = useSinglePriceList()
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid>
      <Grid container justifyContent="center">
        <Typography className={classes.h3}>{t('first-step.wish')}</Typography>
      </Grid>
      <Grid>
        <FormTextField
          name="message"
          type="text"
          label={t('first-step.message')}
          variant="outlined"
          color="primary"
          multiline
          rows={9}
          InputProps={{
            classes: {
              root: classes.message,
            },
          }}
        />
        <CheckboxField name="anonymous" label={t('first-step.check-box-label') as string} />
        <Typography variant="body1">{t('first-step.info-anonimus')}</Typography>
        <Typography className={classes.h3}>{t('first-step.amount')}</Typography>
      </Grid>
      <Grid my={5}>
        <PriceRadioGroup name="amount" options={prices} />
      </Grid>
    </Grid>
  )
}
