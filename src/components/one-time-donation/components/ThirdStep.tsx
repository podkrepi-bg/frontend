import { Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import CheckboxField from 'components/common/form/CheckboxField'
import FormTextField from 'components/common/form/FormTextField'
import { useTranslation } from 'next-i18next'

export default function ThirdStep() {
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4" sx={{ marginBottom: theme.spacing(4) }}>
        {t('first-step.wish')}
      </Typography>
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
    </Grid>
  )
}
