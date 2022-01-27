import { Container, Typography } from '@mui/material'
import Layout from 'components/layout/Layout'
import Search from './navigation/Search'
import CarsGrid from './CarsGrid'
import ClippedDrawer from './navigation/Drawer'
import AppBarMenu from './navigation/AppBar'
import SearchIcon from '@mui/icons-material/Search'
export default function CarsPage(props: any) {
  return (
    <Layout>
      <div style={{ display: 'flex', marginTop: '30px', background: '#eeeeee' }}>
        <ClippedDrawer />
        <Container disableGutters>
          <Container sx={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
            <Search></Search>
            <SearchIcon color="action" sx={{ marginLeft: '5px' }} />
          </Container>
          <AppBarMenu></AppBarMenu>
          <Container disableGutters sx={{ background: 'white', p: '40px 50px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Задачи
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>Всички задачи, текущи, завършени</Typography>
          </Container>
          <CarsGrid></CarsGrid>
        </Container>
      </div>
    </Layout>
  )
}
