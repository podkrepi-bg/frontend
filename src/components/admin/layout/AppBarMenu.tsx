import { Typography, Box, Toolbar } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { IconButton } from '@mui/material'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

export default function AppBarMenu() {
  const router = useRouter()

  const addHandler = () => {
    router.push(routes.admin.infoRequestCreate)
  }

  const deleteHandler = () => {
    console.log('delete')
  }

  const actions = [
    { icon: <AddIcon />, name: 'Add', handler: addHandler },
    { icon: <DeleteIcon />, name: 'Delete', handler: deleteHandler },
  ]

  return (
    <>
      <Toolbar
        disableGutters
        variant="dense"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: 'white',
          width: '100%',
          borderRadius: '13px 13px 0 0',
          pl: '24px',
        }}>
        <Typography variant="h5" color="primary">
          Info request
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton>
            <HomeIcon color="action" />
          </IconButton>
          <Typography fontSize={'18px'} sx={{ px: 0.5, height: '20px' }}>
            /
          </Typography>
          <IconButton sx={{ borderRadius: '10px' }}>
            <Typography>Info request2</Typography>
          </IconButton>
        </Box>
      </Toolbar>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'white',
          width: '100%',
          borderRadius: '13px 13px 0 0',
          pl: '24px',
        }}>
        <SpeedDial hidden={false} icon={<SpeedDialIcon />} direction="left" ariaLabel="test">
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.handler}
            />
          ))}
        </SpeedDial>
      </Toolbar>
    </>
  )
}
