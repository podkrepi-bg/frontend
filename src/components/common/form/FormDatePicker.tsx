import { TextField } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'
import { useField, useFormikContext } from 'formik'
import { useTranslation } from 'next-i18next'

import { DATE_VALUE_FORMAT, getDateFormat } from 'common/util/date'

/**
 * MUI date picker to be connected with Formik. Propagates updates to the passed Formik field name
 * @param name - name of the Formik field to bind
 * @param label - prompt text
 * @returns
 */
export default function FormDatePicker({ name, label }: { name: string; label: string }) {
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()
  const { i18n } = useTranslation()

  const dateViewFormat = getDateFormat(i18n.language)
  const mask = dateViewFormat.replace(new RegExp(/[^./]/g), '_')

  const updateValue = (newValue: Date) => {
    let formattedValue
    try {
      if (newValue.getFullYear() < 1900) {
        // Fix a bug that appears while we type the year
        // it considers 0020 as a valid year
        throw new Error('Invalid year')
      }
      formattedValue = format(newValue, DATE_VALUE_FORMAT)
    } catch {
      formattedValue = field.value
    } finally {
      setFieldValue(name, formattedValue, true)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        mask={mask}
        inputFormat={dateViewFormat}
        label={label}
        value={field.value}
        onChange={(newValue) => updateValue(newValue)}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
  )
}
