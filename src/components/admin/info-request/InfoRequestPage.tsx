import { Container } from '@mui/material'
import InfoRequestGrid from '../info-request/InfoRequestGrid'
import AppBarMenu from '../layout/AppBarMenu'
import MainLayout from '../layout/MainLayout'

function InfoRequestPage() {
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
        }}>
        <Container sx={{ pt: '24px' }} disableGutters maxWidth={false}>
          <AppBarMenu />
          <InfoRequestGrid />
        </Container>
      </Container>
    </MainLayout>
  )
}

export default InfoRequestPage
