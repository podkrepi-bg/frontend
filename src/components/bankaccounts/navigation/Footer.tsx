import { Copyright } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

function PanelFooter() {
  return (
    <Box sx={{ position: 'absolute', width: '100%', bottom: '0', left: '0', right: '0' }}>
      <div
        style={{
          background: '#294e85',
          height: '70px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          variant="h6"
          color="white"
          display="flex"
          alignItems="center"
          style={{ transform: 'scale(0.75)' }}>
          <Copyright />
          Copyright
        </Typography>
      </div>
    </Box>
  )
}

export default PanelFooter
