import { usePersonList } from 'common/hooks/person'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useField } from 'formik'

export default function SelectCoordinator({ name = 'coordinatorId' }) {
  const { t } = useTranslation()
  const [field] = useField(name)
  const { data: personList } = usePersonList()
  const { data: coordinatorList } = useCoordinatorsList()

  return (
    <FormControl fullWidth size="small" variant="outlined">
      <InputLabel>Избери</InputLabel>
      <Select fullWidth defaultValue="" label={t('campaigns:campaign.type')} {...field}>
        {personList
          ?.filter((person) => {
            return !coordinatorList?.find((c) => c.personId === person.id)
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
