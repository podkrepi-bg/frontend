import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'
import { RecurringDonationStatus } from 'gql/recurring-donation-status.d'

import FormTextField from 'components/common/form/FormTextField'

export default function RecurringDonationStatusSelect({ name = 'status' }) {
  const { t } = useTranslation('recurring-donation')

  const values = Object.keys(RecurringDonationStatus)
  const [field, meta] = useField(name)

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <FormTextField select type="text" fullWidth defaultValue="" label={t(name)} {...field}>
        <MenuItem value="" disabled>
          {t(name)}
        </MenuItem>
        {values?.map((value, index) => (
          <MenuItem key={index} value={value}>
            {t('statuses.' + value)}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
