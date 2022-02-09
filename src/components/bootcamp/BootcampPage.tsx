import { Container } from '@mui/material'
import Layout from './Layout'
import BootcampGrid from './BootcampGrid'

export default function BootcampPage() {
  return (
    <Layout title="Bootcamp">
      <Container maxWidth="lg">
        <BootcampGrid />
      </Container>
    </Layout>
  )
}
