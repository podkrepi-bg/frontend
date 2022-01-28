import { Container } from '@mui/material'
import TasksGrid from './Grid'

import LayoutPanel from '../navigation/LayoutPanel'
import AppBarMenu from '../navigation/AppBar'
import BasicModal from './Modal'
const Tasks = () => {
  return (
    <div style={{ height: '100vh', background: '#f2f2f2' }}>
      <LayoutPanel />
      <BasicModal />
      <Container>
        <Container disableGutters>
          <AppBarMenu />
          <TasksGrid />
        </Container>
      </Container>
    </div>
  )
}

export default Tasks
