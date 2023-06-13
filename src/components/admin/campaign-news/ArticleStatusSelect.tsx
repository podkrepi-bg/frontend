import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { ArticleStatus } from './helpers/article-status.enum'

export default function ArticleStatusSelect({ name = 'state' }) {
  const { t } = useTranslation('news')
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''

  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('news:article.status')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('news:article.status')} {...field}>
        {Object.values(ArticleStatus).map((value, index) => (
          <MenuItem key={index} value={value}>
            {t(`status.${value}`)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
