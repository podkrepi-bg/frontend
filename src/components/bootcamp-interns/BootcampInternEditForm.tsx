import GenericForm from 'components/common/form/GenericForm'
import * as yup from 'yup'
import { ButtonGroup, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { makeStyles } from '@mui/styles'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

import { drawerWidth } from './MyDrawer'
import { BootcampIntern } from 'lib/interfaces/BootcampIntern'
import { UseBaseQueryResult, useQuery } from 'react-query'
import { useFetchBootcampIntern } from 'common/hooks/bootcampIntern'

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

export default function BootcampInternEditForm() {
  const router = useRouter()
  const classes = useStyles()
  const internId = router.query.id

  if (typeof internId !== 'string') return

  const { data, isError, isLoading }: UseBaseQueryResult<BootcampIntern> =
    useFetchBootcampIntern(internId)

  const defaults = {
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
  }

  const onSubmit = async (internData: any) => {
    await axios.patch(endpoints.bootcampIntern.listBootcampIntern.url + `/${intern.id}`, internData)
    router.push(routes.bootcampIntern.index)
  }

  return (
    <Grid className={classes.internForm} container direction="column" component="section">
      <Typography variant="h2" className={classes.internFormHeader}>
        Edit the clicked intern
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
            <ButtonGroup>
              <SubmitButton />
              <Button onClick={() => router.push(routes.bootcampIntern.index)}>Cancel</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
