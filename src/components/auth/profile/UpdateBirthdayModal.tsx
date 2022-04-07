import { useState } from 'react'
import { Modal, Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { Person, UpdatePerson } from 'gql/person'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { updateCurrentPerson } from 'common/util/useCurrentPerson'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

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
})

function UpdateBirthdayModal({
  isOpen,
  handleClose,
  currentValue,
}: {
  isOpen: boolean
  handleClose: (data?: Person) => void
  currentValue: UpdatePerson
}) {
  const [value, setValue] = useState<Date | null>(currentValue.birthday as Date)

  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  const classes = useStyles()

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
  })

  const onSubmit = async () => {
    mutation.mutateAsync({ birthday: value }).then((data) => {
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
        <h2>Обнови рожден ден</h2>
        <GenericForm onSubmit={onSubmit} initialValues={currentValue}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <FormTextField
                      type="text"
                      name="birthday"
                      autoComplete="birthday"
                      label="birthday"
                      {...params}
                    />
                  )}
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
