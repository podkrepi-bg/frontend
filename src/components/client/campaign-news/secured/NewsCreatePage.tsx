import { Container } from '@mui/material'
import Layout from 'components/client/layout/Layout'
import CreateForm from './CreateForm'
import { routes } from 'common/routes'

type Props = {
  campaignId: string
  campaignTitle: string
  isAdmin: boolean
  slug: string
}

export default function NewsCreatePage({ campaignId, isAdmin }: Props) {
  return (
    <Layout>
      <Container maxWidth={'md'}>
        <CreateForm campaignId={campaignId} isAdmin={isAdmin} />
      </Container>
    </Layout>
  )
}
