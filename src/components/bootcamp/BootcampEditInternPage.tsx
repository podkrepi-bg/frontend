import { Container } from '@mui/material'
import { useBootcampIntern } from 'common/hooks/bootcamp'
import Layout from './Layout'
import EditInternForm from './EditInternForm'

export default function BootcampEditInternPage(props: any) {
  const id = props.id.query.id
  const { data } = useBootcampIntern(id)

  return (
    <Layout title="Bootcamp Intern">
      <Container maxWidth="lg">
        <EditInternForm initialValues={data} id={id} />
      </Container>
    </Layout>
  )
}
