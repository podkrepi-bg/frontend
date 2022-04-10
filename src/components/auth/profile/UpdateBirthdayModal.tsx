import { useState } from 'react'
import { Modal, Box, Grid, TextField, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import { Person, UpdatePerson } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    backgroundColor: '#EEEEEE',
    padding: 20,
  },
  close: {
    position: 'absolute',
    right: '10px',
  },
})

function UpdateBirthdayModal({
  isOpen,
  handleClose,
  person,
}: {
  isOpen: boolean
  handleClose: (data?: Person) => void
  person: UpdatePerson
}) {
  const { t } = useTranslation()
  const [value, setValue] = useState<Date | null>(person.birthday as Date)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const classes = useStyles()

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.success'), 'success'),
  })

  const onSubmit = async () => {
    mutation.mutateAsync({ ...person, birthday: value }).then((data) => {
      handleClose(data.data)
    })
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={classes.modal}>
        <IconButton className={classes.close} onClick={() => handleClose()}>
          <CloseIcon />
        </IconButton>
        <h2>Обнови рожден ден</h2>
        <GenericForm onSubmit={onSubmit} initialValues={person}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <SubmitButton fullWidth />
            </Grid>
          </Grid>
        </GenericForm>
      </Box>
    </Modal>
  )
}

export default UpdateBirthdayModal
