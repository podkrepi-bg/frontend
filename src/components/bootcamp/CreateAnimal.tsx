import { Box } from '@mui/material'
import Layout from 'components/layout/Layout'
import CreateAnimalForm from './CreateAnimalForm'
import MiniDrawer from './Drawer'

export default function CreateAnimal() {
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <div id="drawer-container" style={{ position: 'relative' }}>
          <MiniDrawer>
            <CreateAnimalForm />
          </MiniDrawer>
        </div>
      </Box>
    </Layout>
  )
}
