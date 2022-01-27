import SearchIcon from '@mui/icons-material/Search'
import { Container, Typography } from '@mui/material'
import Layout from 'components/layout/Layout'
import ClippedDrawer from './Drawer'
import Search from './Search'
import AppBarMenu from './AppBar'
function Home() {
  return (
    <Layout>
      <div style={{ display: 'flex', background: '#eeeeee', height: 'calc(100vh - 400px)' }}>
        <ClippedDrawer />
        <Container disableGutters>
          <Container sx={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
            <Search></Search>
            <SearchIcon color="action" sx={{ marginLeft: '5px' }} />
          </Container>
          <AppBarMenu></AppBarMenu>
          <Container disableGutters sx={{ background: 'white', p: '40px 80px', marginTop: '2px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Начална страница
            </Typography>
            <Typography>Това е началната страница. Точка</Typography>
          </Container>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
