import Layout from 'components/layout/Layout'
import BootcampInternGrid from './BootcampInternGrid'
import BootcampInternCreateForm from './BootcampInternCreateForm'
import ResponsiveAppBar from './ResponsiveAppBar'
import { Grid } from '@mui/material'
import MyLayout from './MyLayout'
import IconsMenu from './IconsMenu'

export default function BootcampInternPage(props: any) {
  return (
    <MyLayout>
      <Grid container>
        <IconsMenu />
        <BootcampInternCreateForm />
        <BootcampInternGrid />
      </Grid>
    </MyLayout>
  )
}
