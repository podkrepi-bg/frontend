import { Grid } from '@mui/material'

import MyLayout from './MyLayout'
import BootcampInternGrid from './BootcampInternGrid'

export default function BootcampInternPage() {
  return (
    <MyLayout>
      <Grid container>
        <BootcampInternGrid />
      </Grid>
    </MyLayout>
  )
}
