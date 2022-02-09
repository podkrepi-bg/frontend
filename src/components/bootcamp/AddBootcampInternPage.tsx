import { Container } from '@mui/material'
import Layout from './Layout'
import AddInternForm from './AddInternForm'

export default function BootcampPage() {
  return (
    <Layout title="Bootcamp">
      <Container maxWidth="lg">
        <AddInternForm />
      </Container>
    </Layout>
  )
}
