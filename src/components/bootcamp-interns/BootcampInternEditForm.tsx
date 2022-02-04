import * as yup from 'yup'
import { AxiosError } from 'axios'
import { observer } from 'mobx-react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'
import { UseBaseQueryResult, useMutation } from 'react-query'
import { ButtonGroup, Grid, Typography, Button } from '@mui/material'

import { routes } from 'common/routes'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { name, email } from 'common/form/validation'
import GenericForm from 'components/common/form/GenericForm'
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { useFetchBootcampIntern } from 'common/hooks/bootcampIntern'
import { BootcampInternInput, BootcampInternResponse } from 'gql/bootcamp'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { NotificationStore } from 'stores/bootcamp-interns/NotificationStore'

import { drawerWidth } from './MyDrawer'

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

const validationSchema: yup.SchemaOf<BootcampInternInput> = yup.object().shape({
  firstName: name,
  lastName: name,
  email: email,
  id: yup.string(),
})

export default observer(function BootcampInternEditForm() {
  const { setNotificationMessage, showNotification } = NotificationStore

  const router = useRouter()
  const { t } = useTranslation()
  const classes = useStyles()
  const internId = router.query.id

  if (typeof internId !== 'string') {
    showNotification()
    setNotificationMessage('Invalid id passed , please try again.')
    router.push(routes.bootcampIntern.index)
    return null
  }

  const { data, isLoading }: UseBaseQueryResult<BootcampIntern> = useFetchBootcampIntern(internId)

  const defaults: BootcampInternResponse = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
  }

  const submitIntern = async (internData: BootcampIntern) => {
    await axios.patch(endpoints.bootcampIntern.listBootcampIntern.url + `/${internId}`, internData)
  }

  const mutation = useMutation({
    mutationFn: submitIntern,
    onError: () => {
      showNotification()
      setNotificationMessage('Something went wrong, please try again later.')
    },
    onSuccess: () => {
      router.push(routes.bootcampIntern.index)
      showNotification()
      setNotificationMessage('Sucessfully edited the intern.')
    },
  })

  const onSubmit = async (values: any, { setFieldError }: FormikHelpers<any>) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        id: internId,
      })
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
        Edit the clicked intern
      </Typography>
      <GenericForm
        onSubmit={onSubmit}
        enableReinitialize
        initialValues={defaults}
        validationSchema={validationSchema}>
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
            <ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
              <SubmitButton disabled={isLoading} />
              <Button onClick={() => router.push(routes.bootcampIntern.index)}>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
})
