import { Button, ButtonGroup, Grid, Typography } from '@mui/material'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { createStyles, makeStyles } from '@mui/styles'
import { AxiosError, AxiosResponse } from 'axios'

import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import { BootcampStudentInput, BootcampStudentResponse } from 'gql/bootcamp'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { createBootcampStudent, editBootcampStudent } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'

const validationSchema: yup.SchemaOf<BootcampStudentInput> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(3).max(10).required(),
    lastName: yup.string().trim().min(3).max(10).required(),
    id: yup.string().uuid(),
  })

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      position: 'absolute',
      top: '30%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      padding: 16,
      textAlign: 'center',
      justifyContent: 'center',
    },
    deleteBtn: {
      ':hover': {
        backgroundColor: '#bf0000',
      },
    },
  }),
)

const defaults: BootcampStudentResponse = {
  id: '',
  firstName: '',
  lastName: '',
}

type Props = {
  initialValues?: BootcampStudentResponse
  closeModalHandler: () => void
}

export function CreateStudent({ initialValues, closeModalHandler }: Props) {
  const router = useRouter()
  const { t } = useTranslation()
  const classes = useStyles()
  const mutation = useMutation<
    AxiosResponse<BootcampStudentResponse>,
    AxiosError<ApiErrors>,
    BootcampStudentResponse
  >({
    mutationFn: initialValues ? editBootcampStudent : createBootcampStudent,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const submitHandler = async (
    values: BootcampStudentResponse,
    { resetForm, setFieldError }: FormikHelpers<BootcampStudentResponse>,
  ) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        id: initialValues?.id || '',
      })
      resetForm()
      closeModalHandler()
      router.replace(router.asPath)
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }
  return (
    <Grid className={classes.modal} container direction="column">
      <Grid item sx={{ mb: 1 }}>
        <Typography variant="h5">{initialValues ? 'Edit' : 'Add'} student</Typography>
      </Grid>
      <GenericForm
        initialValues={initialValues || defaults}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="First name"
              name="firstName"
              autoComplete="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Last name" name="lastName" autoComplete="lastName" />
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <Button variant="contained" type="submit">
                {initialValues ? 'Edit' : 'Add'}
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                className={classes.deleteBtn}
                onClick={closeModalHandler}>
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
