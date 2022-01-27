import React from 'react'
import { Container, Drawer, ListItemButton, Typography } from '@mui/material'
import Layout from 'components/layout/Layout'
import Search from './navigation/Search'
import CarsGrid from './CarsGrid'
import CarsInput from './CarsInput'
import ClippedDrawer from './navigation/Drawer'
import AppBarMenu from './navigation/AppBar'
import SearchIcon from '@mui/icons-material/Search'
export default function CarsPage(props: any) {
  return (
    <Layout>
      <div style={{ display: 'flex', marginTop: '30px', background: '#eeeeee' }}>
        <ClippedDrawer />
        <Container disableGutters>
          <Container sx={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
            <Search></Search>
            <SearchIcon color="action" sx={{ marginLeft: '5px' }} />
          </Container>

          <AppBarMenu></AppBarMenu>
          <Container sx={{ background: 'white' }}>
            <Typography variant="h3">Tasks</Typography>
          </Container>
          <CarsGrid></CarsGrid>
        </Container>
      </div>
    </Layout>
  )
}
