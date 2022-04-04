import { useTranslation } from 'react-i18next'
import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { useDocumentsList } from 'common/hooks/documents'
import FormTextField from 'components/common/form/FormTextField'

export default function DocumentSelect({ name = 'documentId' }) {
  const { t } = useTranslation('expenses')

  const values = useDocumentsList().data?.map((record) => record.id)
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
        <MenuItem key={'none'} value="">
          <i>{t('fields.empty')}</i>
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
