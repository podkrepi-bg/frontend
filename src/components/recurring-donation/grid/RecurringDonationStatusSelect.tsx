import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import FormTextField from 'components/common/form/FormTextField'

export default function RecurringDonationStatusSelect({ name = 'status' }) {
  const { t } = useTranslation('recurring-donation')

  enum RecurringDonationStatus {
    trialing = 'trialing',
    active = 'active',
    canceled = 'canceled',
    incomplete = 'incomplete',
    incompleteExpired = 'incompleteExpired',
    pastDue = 'pastDue',
    unpaid = 'unpaid',
  }

  const values = Object.keys(RecurringDonationStatus)
  const [field, meta] = useField(name)

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormTextField
        select
        type="text"
        fullWidth
        defaultValue=""
        label={t('fields.' + name)}
        {...field}>
        <MenuItem value="" disabled>
          {t('fields.' + name)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
