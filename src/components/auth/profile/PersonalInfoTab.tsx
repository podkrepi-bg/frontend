import { Box, Link } from '@mui/material'
import { useSession } from 'common/util/useSession'
import Tab from './Tab'
import EditIcon from '@mui/icons-material/Edit'

function PersonalInfoTab(props: any) {
  const { value, index } = props
  const { session } = useSession()

  return (
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
      <Link href="#" sx={{ color: '#294E85', float: 'right' }}>
        изтриване на акаунт/ профил
      </Link>
    </Tab>
  )
}

export default PersonalInfoTab
