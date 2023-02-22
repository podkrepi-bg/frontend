import { LoadingButton } from '@mui/lab'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { translateError } from 'common/form/validation'
import useConfirm from 'common/hooks/useConfirm'
import theme from 'common/theme'
import CloseModalButton from 'components/common/CloseModalButton'
import FormFieldButton from 'components/common/FormFieldButton'
import { PersonResponse } from 'gql/person'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import PersonAutocomplete from './PersonAutocomplete'
import PersonInfo from './PersonInfo'

type Props = {
  onConfirm?: (person: PersonResponse | null) => void
  onClose?: (person: PersonResponse | null) => void
  error?: string
  selectedPerson: PersonResponse | null
}

function PersonSelectDialog({
  onConfirm: confirmCallback,
  onClose: closeCallback,
  error,
  selectedPerson,
}: Props) {
  const [person, setPerson] = useState<PersonResponse | null>(selectedPerson)
  const { t } = useTranslation()
  const { open, confirmHandler, closeHandler, openHandler, loading } = useConfirm({
    onConfirm: async () => {
      confirmCallback ? confirmCallback(person) : null
    },
    onClose: async () => {
      closeCallback ? closeCallback(person) : null
    },
  })
  return (
    <>
      <FormFieldButton
        onClick={openHandler}
        placeholder={t('person:personSelect')}
        value={person ? `${person.firstName} ${person.lastName}` : undefined}
        button={{ label: t('person:selectDialog.select') }}
        error={error ? translateError(error, t) : undefined}
      />
      <Dialog fullWidth open={open} onClose={closeHandler}>
        <DialogTitle>{t('person:personSelect')}</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <PersonAutocomplete
              onSelect={(person) => {
                setPerson(person)
              }}
              showId
              autocompleteProps={{ defaultValue: person }}
            />
          </Box>

          <Box sx={{ marginTop: theme.spacing(2) }}>
            {person ? <PersonInfo person={person} /> : t('person:selectDialog.notSelected')}
          </Box>
        </DialogContent>
        <DialogActions>
          <CloseModalButton onClose={closeHandler} />
          <LoadingButton onClick={confirmHandler} loading={loading}>
            {t('person:selectDialog.confirm')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PersonSelectDialog
