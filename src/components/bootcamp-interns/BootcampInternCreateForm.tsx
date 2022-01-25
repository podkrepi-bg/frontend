import GenericForm from 'components/common/form/GenericForm'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { routes } from 'common/routes'

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

  const onSubmit = async (internData: any) => {
    await axios.post(endpoints.bootcampIntern.listBootcampIntern.url, internData)
    router.push(routes.bootcampIntern.index)
  }

  return (
    <Grid container direction="column" component="section" style={{ marginTop: '50px' }}>
      <GenericForm onSubmit={onSubmit} initialValues={defaults} validationSchema={validationSchema}>
        <Grid container spacing={3}>
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

          <Grid item xs={12}>
            <SubmitButton fullWidth />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
