import React from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { GridRenderEditCellParams } from '@mui/x-data-grid'
import { TextField, Tooltip, Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import { Save } from '@mui/icons-material'
import { PersonResponse } from 'gql/person'
import { DonationResponse, UserDonationInput } from 'gql/donations'
import { useEditDonation } from 'service/donation'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { personFilter } from 'components/common/person/PersonAutoCompleteFilter'
import theme from 'common/theme'

interface RenderEditCellProps {
  params: GridRenderEditCellParams
  personList?: PersonResponse[]
  onUpdate(): void
}
const addIconStyles = {
  background: theme.palette.primary.light,
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}

export default function RenderEditBillingEmailCell({
  params,
  personList,
  onUpdate,
}: RenderEditCellProps) {
  const { t } = useTranslation()

  const initialPerson = {
    firstName: params.row.billingEmail,
    lastName: '',
    email: params.row.email || params.row.billingEmail || '',
  }
  const [person, setPerson] = React.useState<PersonResponse | null>({
    ...initialPerson,
  } as PersonResponse)
  const mutationFn = useEditDonation(params.row.id)

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    UserDonationInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('donations:alerts.editDonor'), 'success')
      onUpdate()
      params.api.stopCellEditMode({ id: params.row.id, field: params.field })
    },
  })

  const onClick = () => {
    if (person) {
      const donationData: UserDonationInput = params.row
      donationData.targetPersonId = undefined
      donationData.billingEmail = person.email
      mutation.mutate(donationData)
    } else {
      AlertStore.show(t('donations:alerts.requiredError'), 'error')
    }
  }

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: 0.7, overflow: 'auto' }}>
      <Autocomplete
        id="edit-person-cell"
        sx={{ width: 300 }}
        value={person}
        ListboxProps={{ style: { maxHeight: 300 } }}
        onChange={(event, newValue: PersonResponse | null) => {
          setPerson(newValue)
        }}
        options={personList || []}
        getOptionLabel={(option: PersonResponse) => `${option.email}`}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
        renderOption={(params, option: PersonResponse) => (
          <Box component="li" {...params} key={option.id}>
            {`${option.firstName} ${option.lastName} (${option.email ? option.email : ''})`}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        filterOptions={personFilter}
        clearText={t('donations:cta.clear')}
        noOptionsText={t('donations:noOptions')}
        openText={t('donations:cta.open')}
        closeText={t('donations:cta.close')}
      />
      <Tooltip title={t('donations:cta.save')}>
        <Save sx={addIconStyles} color="action" fontSize="medium" onClick={onClick} />
      </Tooltip>
    </Box>
  )
}
