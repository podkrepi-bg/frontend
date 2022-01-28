import { Box } from '@mui/material'
import Layout from 'components/layout/Layout'
import AnimalsGrid from './AnimalsGrid'
import MiniDrawer from './Drawer'

export default function AnimalsPage() {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <div id="drawer-container" style={{ position: 'relative' }}>
          <MiniDrawer>
            <AnimalsGrid />
          </MiniDrawer>
        </div>
      </Box>
    </Layout>
  )
}
