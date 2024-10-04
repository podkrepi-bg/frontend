import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns'
import { useField, useFormikContext } from 'formik'

import { DATE_VALUE_FORMAT, dateViewFormat } from 'common/util/date'

/**
 * MUI date picker to be connected with Formik. Propagates updates to the passed Formik field name
 * @param name - name of the Formik field to bind
 * @param label - prompt text
 * @returns
 */
export default function FormDatePicker({ name, label }: { name: string; label: string }) {
  const [field] = useField(name)
  const { setFieldValue } = useFormikContext()

  const updateValue = (newValue: Date | null) => {
    let formattedValue
    try {
      if (newValue && newValue.getFullYear() < 1900) {
        // Fix a bug that appears while we type the year
        // it considers 0020 as a valid year
        throw new Error('Invalid year')
      }
      formattedValue = newValue ? format(newValue, DATE_VALUE_FORMAT) : null
    } catch {
      formattedValue = field.value
    } finally {
      setFieldValue(name, formattedValue, true)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        format={dateViewFormat}
        label={label}
        value={new Date(field?.value)}
        onChange={(newValue) => updateValue(newValue)}
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  )
}
