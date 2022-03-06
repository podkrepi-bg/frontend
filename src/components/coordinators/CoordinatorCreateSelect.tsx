import { usePersonList } from 'common/hooks/person'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

function CoordinatorCreateSelect() {
  const { t } = useTranslation()
  const [field] = useField('personId')
  const { data: personList } = usePersonList()
  const { data: coordinatorLsit } = useCoordinatorsList()

  return (
    <FormControl fullWidth>
      <InputLabel>Избери</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:campaign.type')} {...field}>
        {personList
          ?.filter((person) => {
            return !coordinatorLsit?.find((c) => c.personId === person.id)
          })
          ?.map((person) => {
            return (
              <MenuItem key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

export default CoordinatorCreateSelect
