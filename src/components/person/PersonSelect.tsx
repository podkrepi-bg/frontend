import { FormControl, MenuItem } from '@mui/material'
import { useField } from 'formik'

import { usePersonList } from 'common/hooks/person'
import FormTextField from 'components/common/form/FormTextField'

export default function PersonSelect({ name = 'personId', label = '', ...textFieldProps }) {
  const [field, meta] = useField(name)
  const { data: personList } = usePersonList()

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
        label={label}
        {...field}
        {...textFieldProps}>
        <MenuItem value="" disabled>
          {label}
        </MenuItem>
        <MenuItem key={'none'} value="">
          <i>---</i>
        </MenuItem>
        {personList?.map((person, index) => (
          <MenuItem key={index} value={person.id}>
            {person.firstName} {person.lastName}
          </MenuItem>
        ))}
      </FormTextField>
    </FormControl>
  )
}
