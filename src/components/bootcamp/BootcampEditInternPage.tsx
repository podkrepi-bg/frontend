import { Container } from '@mui/material'
import { useBootcampIntern } from 'common/hooks/bootcamp'
import Layout from './Layout'
import EditInternForm from './EditInternForm'

type Props = { id: string }
export default function BootcampEditInternPage({ id }: Props) {
  const { data } = useBootcampIntern(id)

  return (
    <Layout title="Bootcamp Intern">
      <Container maxWidth="lg">
        <EditInternForm initialValues={data} id={id} />
      </Container>
    </Layout>
  )
}
