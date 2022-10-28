import React from 'react'
import { observer } from 'mobx-react'
import { GridRenderEditCellParams } from '@mui/x-data-grid'
import { useMutation } from 'react-query'
import { Autocomplete, createFilterOptions, TextField, Tooltip } from '@mui/material'
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
    onError: () => AlertStore.show('Error', 'error'),
    onSuccess: () => AlertStore.show('Edit', 'success'),
  })

  const onClick = async () => {
    if (value) {
      const donationData: UserDonationInput = params.row
      donationData.targetPersonId = value.id
      mutation.mutate(donationData)
    } else {
      AlertStore.show('No person provided', 'error')
    }
  }

  return (
    <>
      <Autocomplete
        // disablePortal
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
        options={(personList || []).filter((value, index, self) => self.indexOf(value) === index)} //is it necessary?
        getOptionLabel={(option: PersonResponse) =>
          `${option.firstName} ${option.lastName} - ${option.email}`
        }
        sx={{ width: 300 }}
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
        onClose={(event, reason) => console.log(reason)}
      />
      <Tooltip title="Запис">
        <Save sx={addIconStyles} color="action" fontSize="medium" onClick={onClick} />
      </Tooltip>
    </>
  )
})
