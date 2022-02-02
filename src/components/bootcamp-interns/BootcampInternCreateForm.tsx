import GenericForm from 'components/common/form/GenericForm'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { routes } from 'common/routes'
import { makeStyles } from '@mui/styles'

import { drawerWidth } from './MyDrawer'
import { useContext } from 'react'
import { DrawerContext } from './context/DrawerContext'
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
import { useMutation } from 'react-query'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { AxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(() => {
  return {
    internForm: {
      marginLeft: drawerWidth,
      marginTop: '200px',
    },
    internFormHeader: {
      marginBottom: '50px',
    },
  }
})

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().min(3).max(20).required(),
  lastName: yup.string().trim().min(3).max(20).required(),
  email: yup.string().trim().min(8).max(40).email('Invalid email').required(),
})

const defaults = {
  firstName: '',
  lastName: '',
  email: '',
}

export default function BootcampInternCreateForm() {
  const router = useRouter()
  const classes = useStyles()
  const { setNotificationMessage, setNotificationsOpen }: any = useContext(DrawerContext)
  const { t } = useTranslation()

  const createIntern = async (internData: BootcampIntern) => {
    await axios.post(endpoints.bootcampIntern.listBootcampIntern.url, internData)
  }

  const mutation = useMutation({
    mutationFn: createIntern,
    onError: () => {
      setNotificationsOpen(true)
      setNotificationMessage('Something went wrong, please try again later.')
    },
    onSuccess: () => {
      router.push(routes.bootcampIntern.index)
      setNotificationsOpen(true)
      setNotificationMessage('Sucessfully created new intern.')
    },
  })

  const onSubmit = async (values: any, { setFieldError, resetForm }: FormikHelpers<any>) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      })
      resetForm()
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
    <Grid className={classes.internForm} container direction="column" component="section">
      <Typography variant="h2" className={classes.internFormHeader}>
        Create new Softuni Bootcamp Intern
      </Typography>
      <GenericForm onSubmit={onSubmit} initialValues={defaults} validationSchema={validationSchema}>
        <Grid container spacing={1.3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="firstName"
              label="First name"
              autoComplete="firstName"
            />
          </Grid>

          <Grid item xs={12}>
            <FormTextField type="text" name="lastName" label="Last name" autoComplete="lastName" />
          </Grid>

          <Grid item xs={12}>
            <FormTextField type="text" name="email" label="Email" autoComplete="email" />
          </Grid>

          <Grid item mt={3} xs={12}>
            <SubmitButton fullWidth />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
