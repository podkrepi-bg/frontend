import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useConfirm from 'common/hooks/confirm'
import theme from 'common/theme'
import CloseModalButton from 'components/common/CloseModalButton'
import { PersonResponse } from 'gql/person'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'
import PersonAutocomplete from './PersonAutocomplete'
import PersonInfo from './PersonInfo'

type Props = {
  onConfirm: (person: PersonResponse) => void
}

const useStyles = makeStyles({
  imitateInputBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid rgba(0, 0, 0, 0.23)`,
    borderRadius: '3px',
    padding: '8.5px 14px',
    cursor: 'pointer',
  },
})
function PersonSelectDialog({ onConfirm: confirmCallback }: Props) {
  const [person, setPerson] = useState<PersonResponse | null>(null)
  const { t } = useTranslation('person')
  const classes = useStyles()
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
      <Box onClick={openHandler} className={classes.imitateInputBox}>
        <Typography>
          {person
            ? `${person.firstName} ${person.lastName} (${person.id})`
            : t('person:selectDialog.notSelected')}
        </Typography>
        <Button sx={{ padding: 0 }} onClick={openHandler}>
          {t('person:selectDialog.select')}
        </Button>
      </Box>
      <Dialog fullWidth open={open} onClose={closeHandler}>
        <DialogTitle>{t('person:selectDialog.personSelect')}</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: theme.spacing(2) }}>
            <PersonAutocomplete
              onSelect={(person) => {
                setPerson(person)
              }}
              showId
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
