import { Box, Button, Link, Modal, Typography } from '@mui/material'
import { useSession } from 'common/util/useSession'
import Tab from './Tab'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#EEEEEE',
  boxShadow: 24,
  p: 4,
}

function PersonalInfoTab(props: any) {
  const { value, index } = props
  const { session } = useSession()
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false)

  return (
    <>
      <Tab value={value} index={index}>
        <h1>Лична информация</h1>
        <h2>Login информация</h2>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              marginRight: '20px',
            }}>
            <p>еmail адрес:</p>
            <p>{session?.email}</p>
          </Box>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              position: 'relative',
            }}>
            <p>парола:</p>
            <p>***********</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon sx={{ position: 'relative', top: '7px' }}></EditIcon>
                <span style={{ color: '#294E85' }}>Редактирай</span>
              </Link>
            </Box>
          </Box>
        </Box>
        <hr></hr>
        <h2>Лична информация</h2>
        <Box sx={{ display: 'flex' }}>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              marginRight: '20px',
              position: 'relative',
            }}>
            <p>Име:</p>
            <p>{session?.name}</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon sx={{ position: 'relative', top: '7px' }}></EditIcon>
                <span style={{ color: '#294E85' }}>Редактирай</span>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              padding: '10px',
              flexBasis: '50%',
              position: 'relative',
            }}>
            <p>рожден ден:</p>
            <p>не е наличен</p>
            <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
              <Link href="#">
                <EditIcon sx={{ position: 'relative', top: '7px' }}></EditIcon>
                <span style={{ color: '#294E85' }}>Редактирай</span>
              </Link>
            </Box>
          </Box>
        </Box>
        <hr></hr>
        <Link
          href="#"
          sx={{ color: '#294E85', float: 'right' }}
          onClick={() => setIsDeleteAccountModalOpen(true)}>
          изтриване на акаунт/ профил
        </Link>
      </Tab>
      <Modal
        open={isDeleteAccountModalOpen}
        onClose={() => setIsDeleteAccountModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Изтриване на профил
          </Typography>
          <Typography sx={{ mt: 2 }}>Ние съжаляваме, че ни напущате</Typography>
          <Typography>Преди да ни напуснете ...</Typography>
          <ul style={{ listStyle: 'disc' }}>
            <li>Ако ви е писнало от емейли, деактивирайте ги от тук.</li>
            <li>Ако .........................., моля пишете тук.</li>
            <li>Изтриването на акаунт е окончателно.</li>
            <li>Няма да има начин да възстановите акаунта</li>
            си.
          </ul>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => setIsDeleteAccountModalOpen(false)}>
            Запази моя профил
          </Button>
          <Button variant="contained" size="large" color="secondary" style={{ marginLeft: '10px' }}>
            Изтрий
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default PersonalInfoTab
