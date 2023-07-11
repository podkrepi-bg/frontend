import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import { TranslatableField, translateError } from 'common/form/validation'
import { useField } from 'formik'
import { BeneficiaryListResponse } from 'gql/beneficiary'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBeneficiariesList } from 'service/beneficiary'

export default function BeneficiarySelect({ name = 'beneficiaryId' }) {
  const { t } = useTranslation()
  const { data } = useBeneficiariesList()
  const [, meta, { setValue }] = useField(name)
  const [beneficiary, setBeneficiary] = useState<BeneficiaryListResponse>()

  const helperText = meta.touched ? translateError(meta.error as TranslatableField, t) : ''
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      error={Boolean(meta.error) && Boolean(meta.touched)}>
      <Autocomplete
        value={beneficiary}
        size="small"
        onChange={(event, newValue: BeneficiaryListResponse | null) => {
          if (!newValue || !newValue.id) return ''
          setBeneficiary(newValue)
          setValue(newValue?.id)
        }}
        options={data || []}
        getOptionLabel={(option: BeneficiaryListResponse) =>
          option.person
            ? `${option.person.firstName} ${option.person.lastName}`
            : `${option.company?.companyName}`
        }
        renderInput={(params) => <TextField {...params} label={t('campaigns:beneficiary')} />}
        renderOption={(params, option: BeneficiaryListResponse) =>
          option.person ? (
            <Box component="li" {...params} key={option.id}>
              {`${option.person.firstName} ${option.person.lastName}`}
            </Box>
          ) : (
            <Box component="li" {...params} key={option.id}>
              {`${option.company?.companyName}`}
            </Box>
          )
        }
        isOptionEqualToValue={(option, value) =>
          option.person
            ? option.person.firstName === value?.person?.firstName
            : option.company?.companyName === value.company?.companyName
        }
      />
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  )
}
