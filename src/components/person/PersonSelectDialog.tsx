import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import useConfirm from 'common/hooks/confirm'
import CloseModalButton from 'components/common/CloseModalButton'
import { PersonResponse } from 'gql/person'
import React, { useState } from 'react'
import PersonAutocomplete from './PersonAutocomplete'

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
        <Typography>{person ? person.firstName : 'No personSelected'}</Typography>
        <Button color="primary" onClick={openHandler}>
          Select Person
        </Button>
      </Box>
      <Dialog open={open} onClose={closeHandler}>
        <DialogTitle>
          Person Select
          {/* <IconButton
            aria-label="close"
            onClick={closeHandler}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <Close />
          </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <PersonAutocomplete
            onSelect={(person) => {
              setPerson(person)
            }}
          />
        </DialogContent>
        <DialogActions>
          <CloseModalButton />
          <LoadingButton onClick={confirmHandler} loading={loading}>
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PersonSelectDialog
