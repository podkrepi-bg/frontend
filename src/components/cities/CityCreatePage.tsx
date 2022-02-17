import Layout from './layout/Layout'
import CityForm from './CityForm'
import { Typography } from '@mui/material'

export default function CountryCreatePage() {
  return (
    <Layout>
      <Typography textAlign="center" variant="h3">
        Създай нов град
      </Typography>
      <CityForm />
    </Layout>
  )
}
