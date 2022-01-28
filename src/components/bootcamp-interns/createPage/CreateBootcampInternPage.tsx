import MyLayout from '../MyLayout'
import { Grid } from '@mui/material'
import BootcampInternCreateForm from '../BootcampInternCreateForm'

export default function CreateBootcampInternPage(props: any) {
  return (
    <MyLayout>
      <Grid container>
        {/* <IconsMenu /> */}
        <BootcampInternCreateForm />
      </Grid>
    </MyLayout>
  )
}
