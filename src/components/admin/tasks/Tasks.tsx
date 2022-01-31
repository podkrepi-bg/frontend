import LayoutPanel from '../navigation/LayoutPanel'
import AppBarMenu from '../navigation/AppBar'
import { Container } from '@mui/material'
import BasicModal from './Modal'
import TasksGrid from './Grid'
const Tasks = () => {
  return (
    <div style={{ height: '100vh', background: '#f7f7f7' }}>
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
