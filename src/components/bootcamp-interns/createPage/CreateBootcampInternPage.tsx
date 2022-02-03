import { Grid } from '@mui/material'

import MyLayout from '../MyLayout'
import BootcampInternCreateForm from '../BootcampInternCreateForm'

export default function CreateBootcampInternPage() {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternCreateForm />
      </Grid>
    </MyLayout>
  )
}
