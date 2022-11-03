import React from 'react'
import { observer } from 'mobx-react'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { GridRenderEditCellParams, GridCellModes } from '@mui/x-data-grid'
import { Autocomplete, createFilterOptions, TextField, Tooltip, Box } from '@mui/material'
import { Save } from '@mui/icons-material'

import { PersonResponse } from 'gql/person'
import { useEditDonation } from 'service/donation'
import { ApiErrors } from 'service/apiErrors'
import { AxiosError, AxiosResponse } from 'axios'
import { DonationResponse, UserDonationInput } from 'gql/donations'
import { AlertStore } from 'stores/AlertStore'

interface RenderCellProps {
  params: GridRenderEditCellParams
  personList?: PersonResponse[]
}
const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}

export default observer(function EditCellModal({ params, personList }: RenderCellProps) {
  const { t } = useTranslation()

  const initialPerson = {
    firstName:
      params.row.person && params.row.person.firstName ? params.row.person.firstName : 'Anonymous',
    lastName:
      params.row.person && params.row.person.lastName ? params.row.person.lastName : 'Donor',
    email: params.row.email || params.row.billingEmail || null,
  }
  const [value, setValue] = React.useState<PersonResponse | null>({
    ...initialPerson,
  } as PersonResponse)
  const [inputValue, setInputValue] = React.useState(
    initialPerson.firstName + ' ' + initialPerson.lastName,
  )
  const mutationFn = useEditDonation(params.row.id)

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    UserDonationInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('donations:alerts.editDonor'), 'success'),
  })

  const onClick = () => {
    if (value) {
      const donationData: UserDonationInput = params.row
      donationData.targetPersonId = value.id
      mutation.mutate(donationData)
      params.api.setCellMode(params.row.id, params.field, GridCellModes.View)
    } else {
      AlertStore.show(t('donations:alerts.requiredError'), 'error')
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: 0.7 }}>
      <Autocomplete
        disablePortal
        value={value}
        onChange={(
          event: React.SyntheticEvent<Element, Event>,
          newValue: PersonResponse | null,
        ) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          const parsed = newInputValue.split(' - ')[0]
          setInputValue(parsed)
        }}
        id="controllable-states-demo"
        options={personList ? personList : []}
        getOptionLabel={(option: PersonResponse) =>
          `${option.firstName} ${option.lastName} - ${option.email}`
        }
        sx={{ width: 300, fontSize: 'small' }}
        renderInput={(params) => <TextField {...params} variant="standard" fullWidth />}
        isOptionEqualToValue={(option, value) => {
          return (
            option.firstName.includes(value.firstName) ||
            option.lastName.includes(value.lastName) ||
            !value
          )
        }}
        filterOptions={createFilterOptions<PersonResponse>({
          matchFrom: 'any',
          limit: 5,
          ignoreCase: true,
          trim: true,
        })}
      />
      <Tooltip title={t('donations:cta.save')}>
        <Save sx={addIconStyles} color="action" fontSize="medium" onClick={onClick} />
      </Tooltip>
    </Box>
  )
})
