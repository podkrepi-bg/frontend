import { Container, Typography } from '@mui/material'
import TasksGrid from './Grid'
import LayoutPanel from '../navigation/LayoutPanel'
import AppBarMenu from '../navigation/AppBar'
import BasicModal from './Modal'
import AddFormSecond from './AddFormSecond'
import { useState } from 'react'
const Tasks = () => {
  const [submitCarForm, setSubmitCarForm] = useState(false)
  return (
    <div style={{ height: '100vh', background: '#f7f7f7' }}>
      <LayoutPanel />
      <BasicModal />
      <Container>
        <Container disableGutters>
          <Typography
            sx={{ color: '#7d7d7d', paddingBottom: '30px' }}
            textAlign="center"
            variant="h4">
            Админ панел
          </Typography>
          <AppBarMenu setSubmitCarForm={setSubmitCarForm} />
          {submitCarForm && <AddFormSecond setSubmitCarForm={setSubmitCarForm}></AddFormSecond>}
          <TasksGrid />
        </Container>
      </Container>
    </div>
  )
}
export default Tasks
