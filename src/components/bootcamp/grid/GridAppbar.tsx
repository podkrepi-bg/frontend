import { Toolbar, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import { Box } from '@mui/system'
import { Add as AddIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}

export default observer(function GridAppBar() {
  const router = useRouter()
  return (
    <Toolbar
      sx={{
        background: 'white',
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{'Всички задачи'}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Добави">
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push('bootcamp/create')
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
