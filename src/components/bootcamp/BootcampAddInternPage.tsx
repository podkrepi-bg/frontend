import { Container } from '@mui/material'
import Layout from './Layout'
import AddInternForm from './AddInternForm'

export default function BootcampAddInternPage() {
  return (
    <Layout title="Bootcamp Intern">
      <Container maxWidth="lg">
        <AddInternForm />
      </Container>
    </Layout>
  )
}
