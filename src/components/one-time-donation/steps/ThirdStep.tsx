import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import FormTextField from 'components/common/form/FormTextField'

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
    </Grid>
  )
}
