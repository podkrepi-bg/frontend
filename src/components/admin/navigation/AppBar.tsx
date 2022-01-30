import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import SearchBar from './SearchBar'
const addIconStyles = {
  borderRadius: '50%',
  background: '#4ac3ff',
  padding: 1.2,
  transform: 'scale(1.3)',
  cursor: 'pointer',
  boxShadow: 3,
}
export default function AppBarMenu({ setSubmitCarForm }: any) {
  return (
    <AppBar elevation={0} sx={{ background: 'white' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ padding: '0 0 0 26px' }}>
            Списък с коли
          </Typography>
          <SearchBar />

          <Box>
            <Tooltip title="Add">
              <AddIcon
                onClick={() => {
                  setSubmitCarForm(true)
                }}
                sx={addIconStyles}
                fontSize="large"></AddIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
