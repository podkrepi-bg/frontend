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

const useStyles = makeStyles((theme) => {
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

  const onSubmit = async (internData: any, { resetForm }: any) => {
    await axios.post(endpoints.bootcampIntern.listBootcampIntern.url, internData)
    router.push(routes.bootcampIntern.index)
    resetForm()
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
