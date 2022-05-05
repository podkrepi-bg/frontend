import { Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import CheckboxField from 'components/common/form/CheckboxField'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'

export default function ThirdStep() {
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid container rowSpacing={1} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ marginBottom: theme.spacing(3) }}>
          {t('first-step.wish')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          name="message"
          type="text"
          label={t('first-step.message')}
          multiline
          rows={9}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckboxField
          name="anonymous"
          label={<Typography fontWeight="bold">{t('first-step.check-box-label')}</Typography>}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{t('first-step.info-anonymous')}</Typography>
      </Grid>
    </Grid>
  )
}
