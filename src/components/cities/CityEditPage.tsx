import { useCity } from 'common/hooks/cities'

import Layout from './layout/Layout'
import CityForm from './CityForm'
import { Typography } from '@mui/material'

type Props = { id: string }
export default function CountryEditPage({ id }: Props) {
  const { data } = useCity(id)

  return (
    <Layout>
      <Typography textAlign="center" variant="h3">
        Проемни
      </Typography>
      <CityForm initialValues={data} id={id} />
    </Layout>
  )
}
