import { Box, Button, TextField, Typography } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'next-i18next'

export function BenevityManualImport() {
  const { t } = useTranslation('')
  const [field, meta] = useField('transactionId')
  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('Въведете ID от Benevity или ID на банкова транзация')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <TextField
          {...field}
          error={Boolean(meta.error) && Boolean(meta.touched)}
          helperText={helperText}
        />
        <Button type="submit">Търсене на запис</Button>
      </Box>
    </>
  )
}
