import React from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { GridRenderEditCellParams, GridCellModes } from '@mui/x-data-grid'
import { TextField, Tooltip, Box } from '@mui/material'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { Save } from '@mui/icons-material'
import { PersonResponse } from 'gql/person'
import { DonationResponse, UserDonationInput } from 'gql/donations'
import { useEditDonation } from 'service/donation'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'

interface RenderEditCellProps {
  params: GridRenderEditCellParams
  personList?: PersonResponse[]
  onUpdate(): void
}
const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}

export default function RenderEditPersonCell({
  params,
  personList,
  onUpdate,
}: RenderEditCellProps) {
  const { t } = useTranslation()

  const initialPerson = {
    firstName:
      params.row.person && params.row.person.firstName ? params.row.person.firstName : 'Anonymous',
    lastName:
      params.row.person && params.row.person.lastName ? params.row.person.lastName : 'Donor',
    email: params.row.email || params.row.billingEmail || null,
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
      params.api.setCellMode(params.row.id, params.field, GridCellModes.View)
    },
  })

  const onClick = () => {
    if (person) {
      const donationData: UserDonationInput = params.row
      donationData.targetPersonId = person.id
      mutation.mutate(donationData)
    } else {
      AlertStore.show(t('donations:alerts.requiredError'), 'error')
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: 0.7 }}>
      <Autocomplete
        id="edit-person-cell"
        sx={{ width: 300 }}
        value={person}
        onChange={(event, newValue: PersonResponse | null) => {
          setPerson(newValue)
        }}
        options={personList || []}
        getOptionLabel={(option: PersonResponse) => `${option.firstName} ${option.lastName}`}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
        renderOption={(params, option: PersonResponse) => (
          <Box component="li" {...params} key={option.id}>
            {`${option.firstName} ${option.lastName} (${option.email ? option.email : ''})`}
          </Box>
        )}
        isOptionEqualToValue={(option, value) => option.firstName === value.firstName}
        filterOptions={createFilterOptions<PersonResponse>({
          matchFrom: 'any',
          limit: 5,
          ignoreCase: true,
          trim: true,
        })}
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
