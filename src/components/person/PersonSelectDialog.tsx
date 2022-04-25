import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import useConfirm from 'common/hooks/confirm'
import theme from 'common/theme'
import CloseModalButton from 'components/common/CloseModalButton'
import { PersonResponse } from 'gql/person'
import React, { useState } from 'react'
import PersonAutocomplete from './PersonAutocomplete'
import PersonInfo from './PersonInfo'

type Props = {
  onConfirm: (person: PersonResponse) => void
}

function PersonSelectDialog({ onConfirm: confirmCallback }: Props) {
  const [person, setPerson] = useState<PersonResponse | null>(null)
  const { open, confirmHandler, closeHandler, openHandler, loading } = useConfirm({
    onConfirm: async () => {
      confirmCallback(person as PersonResponse)
    },
    onClose: async () => {
      null
    },
  })
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{person ? person.firstName : 'You need to select a person'}</Typography>
        <Button
          sx={{ marginLeft: theme.spacing(3) }}
          variant="outlined"
          color="primary"
          onClick={openHandler}>
          Select Person
        </Button>
      </Box>
      <Dialog fullWidth open={open} onClose={closeHandler}>
        <DialogTitle>Person Select</DialogTitle>
        <DialogContent>
          <PersonAutocomplete
            onSelect={(person) => {
              setPerson(person)
            }}
            showId
          />
          <Box sx={{ marginTop: theme.spacing(3) }}>
            {person ? <PersonInfo person={person} /> : "You haven't selected a person"}
          </Box>
        </DialogContent>
        <DialogActions>
          <CloseModalButton onClose={closeHandler} />
          <LoadingButton onClick={confirmHandler} loading={loading}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PersonSelectDialog
