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

function UpdateNameModal({
  isOpen,
  handleClose,
  currentValue,
}: {
  isOpen: boolean
  handleClose: () => void
  currentValue: { firstName: string; lastName: string }
}) {
  const classes = useStyles()

  const mutation = useMutation<AxiosResponse<Person>, AxiosError<ApiErrors>, UpdatePerson>({
    mutationFn: updateCurrentPerson(),
  })

  const onSubmit = async (values: UpdatePerson) => {
    mutation.mutateAsync(values).then((data) => {
      handleClose()
    })
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box className={classes.modal}>
        <h2>Обнови име</h2>
        <GenericForm onSubmit={onSubmit} initialValues={currentValue}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="text"
                name="firstName"
                autoComplete="firstName"
                label="first name"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormTextField
                type="text"
                name="lastName"
                autoComplete="lastName"
                label="last name"
              />
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

export default UpdateNameModal
