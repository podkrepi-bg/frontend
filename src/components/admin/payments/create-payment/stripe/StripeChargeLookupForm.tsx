import { Box, Button, TextField, Typography } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

export function StripeChargeLookupForm() {
  const [field, meta] = useField('extPaymentIntentId')
  const { handleSubmit } = useFormikContext()
  const { t } = useTranslation()
  const helperText = translateError(meta.error as TranslatableField, t)

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Въведете номер на плащане от Страйп')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          {...field}
          error={Boolean(meta.error)}
          helperText={helperText}
        />
        <Typography variant="body2" color={'gray'} fontSize={14}>
          Платещените номера от Страйп започват с:
          <br /> ch_
        </Typography>
        <Button
          type="button"
          variant="outlined"
          onClick={() => handleSubmit()}
          sx={{ marginTop: 4 }}>
          Търсене на запис
        </Button>
      </Box>
    </>
  )
}
