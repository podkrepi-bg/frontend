import { Container, Typography } from '@mui/material'
import CarsGrid from '../CarsGrid'
import AppBarMenu from '../navigation/AppBar'
import Slider from '@mui/material/Slider'
import ClippedDrawer from '../navigation/Drawer'
import Search from '../navigation/Search'
import Layout from 'components/layout/Layout'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
const Tasks = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', background: '#eeeeee' }}>
        <ClippedDrawer />
        <Container disableGutters>
          <Container sx={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
            <Search></Search>
            <SearchIcon color="action" sx={{ marginLeft: '5px' }} />
          </Container>
          <AppBarMenu></AppBarMenu>
          <Container disableGutters sx={{ background: 'white', p: '40px 80px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Задачи
            </Typography>
            <Typography>Всички задачи: нови, текущи, завършени</Typography>
          </Container>
          <Container sx={{ p: '0 30px', background: 'white' }}>
            <CarsGrid></CarsGrid>
            <Box sx={{ position: 'absolute', bottom: '110px', left: '250px' }} width={500}>
              <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto" />
            </Box>
          </Container>
        </Container>
      </div>
    </Layout>
  )
}

export default Tasks
