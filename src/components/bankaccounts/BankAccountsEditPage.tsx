import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import MainLayout from '../admin/navigation/MainLayout'
import BankAccountsEditForm from './BankAccountsEditForm'

export default function BankAccountsEditPage() {
  const router = useRouter()
  return (
    <MainLayout>
      <Container
        maxWidth={false}
        sx={{
          borderRadius: '13px',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          background: '#e9f6ff',
          width: '100%',
          py: 10,
        }}>
        <Container maxWidth="sm">
          <BankAccountsEditForm id={`${router.query.id}`} />
        </Container>
      </Container>
    </MainLayout>
  )
}
