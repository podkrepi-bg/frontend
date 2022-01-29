import MyLayout from '../MyLayout'
import { Grid } from '@mui/material'
import BootcampInternEditForm from '../BootcampInternEditForm'

export default function EditBootcampInternPage(props: any) {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternEditForm intern={props.intern} />
      </Grid>
    </MyLayout>
  )
}
