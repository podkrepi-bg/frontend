import { Grid, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'
import React from 'react'
import CheckboxField from './FormCheckField'
import RadioGroupFormik from './RadioGroupFormik'

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
    body: {
      maxWidth: '662px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
)
const amounts = [
  { values: '2', label: '2 лв.' },
  { values: '20', label: '20 лв.' },
  { values: '5', label: '5 лв.' },
  { values: '50', label: '50 лв.' },
  { values: '10', label: '10 лв.' },
  { values: '100', label: '100 лв.' },
]
export default function FirstStep() {
  const classes = useStyles()
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid>
      <Grid container justifyContent="center">
        <Typography className={classes.h3}>{t('first-step.wish')}</Typography>
      </Grid>
      <Grid className={classes.body}>
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
      <Grid className={classes.body} my={5}>
        <RadioGroupFormik name="amount" options={amounts as []} />
      </Grid>
    </Grid>
  )
}
