import { Box } from '@mui/material'
import { useSession } from 'common/util/useSession'
import Tab from './Tab'

function PersonalInfoTab(props: any) {
  const { value, index } = props
  

  return (
    <Tab value={value} index={index}>
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
          <p>dimitar.plamenov@gmail.com</p>
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
            <a href="#">Редактирай</a>
          </Box>
        </Box>
      </Box>
      <h2>Login информация</h2>
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
          <p>dimitar.plamenov@gmail.com</p>
          <Box sx={{ position: 'absolute', right: '5px', top: '5px' }}>
            <a href="#">Редактирай</a>
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
            <a href="#">Редактирай</a>
          </Box>
        </Box>
      </Box>
    </Tab>
  )
}

export default PersonalInfoTab
