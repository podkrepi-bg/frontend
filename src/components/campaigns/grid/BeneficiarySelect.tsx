import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { useTranslation } from 'react-i18next'
import { useBeneficiariesList } from 'service/beneficiary'

export default function BeneficiarySelect({ name = 'beneficiaryId' }) {
  const { t } = useTranslation()
  const { data } = useBeneficiariesList()
  const [field, meta] = useField(name)

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <InputLabel>{t('campaigns:beneficiary')}</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:beneficiary')} {...field}>
        <MenuItem value="" disabled>
          {t('campaigns:beneficiary')}
        </MenuItem>
        {data?.map((beneficiary, index) => (
          <MenuItem key={index} value={beneficiary.id}>
            {beneficiary.person
              ? `${beneficiary.person.firstName} ${beneficiary.person.lastName}`
              : `${beneficiary.company?.companyName}`}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
