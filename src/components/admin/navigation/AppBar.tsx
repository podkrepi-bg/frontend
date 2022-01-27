import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import SaveIcon from '@mui/icons-material/Save'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import ShareIcon from '@mui/icons-material/Share'
const iconStyles = {
  borderRadius: '50%',
  padding: 1,
  color: 'grey',
  cursor: 'pointer',
  boxShadow: 3,
  marginRight: '15px',
}

export default function AppBarMenu() {
  return (
    <AppBar elevation={0} sx={{ background: 'white' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="New File">
              <FileCopyIcon sx={iconStyles} color="action" fontSize="large"></FileCopyIcon>
            </Tooltip>
            <Tooltip title="Save">
              <SaveIcon sx={iconStyles} color="action" fontSize="large" />
            </Tooltip>
            <Tooltip title="Print">
              <LocalPrintshopIcon
                sx={iconStyles}
                color="action"
                fontSize="large"></LocalPrintshopIcon>
            </Tooltip>
            <Tooltip title="Share">
              <ShareIcon sx={iconStyles} color="action" fontSize="large" />
            </Tooltip>

            <Tooltip title="Add">
              <AddIcon
                sx={{
                  borderRadius: '50%',
                  background: '#4ac3ff',
                  padding: 1.2,
                  transform: 'scale(1.3)',
                  cursor: 'pointer',
                  boxShadow: 3,
                }}
                fontSize="large"></AddIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
