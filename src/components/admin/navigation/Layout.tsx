import SearchIcon from '@mui/icons-material/Search'
import Search from './Search'
import ClippedDrawer from './Drawer'
import Layout from 'components/layout/Layout'
import { Container } from '@mui/material'
export default function LayoutPage({ children }: any) {
  return (
    <Layout>
      <div style={{ display: 'flex', background: '#eeeeee' }}>
        <ClippedDrawer />
        <Container disableGutters>
          <Container sx={{ padding: '15px', display: 'flex', alignItems: 'center' }}>
            <Search></Search>
            <SearchIcon color="action" sx={{ marginLeft: '5px' }} />
          </Container>
          {children}
        </Container>
      </div>
    </Layout>
  )
}
