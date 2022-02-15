import NotificationsIcon from '@mui/icons-material/Notifications'
import { IconButton } from '@mui/material'

export default function DashboardNotifications() {
  return (
    <IconButton
      size="medium"
      sx={{
        marginRight: '4px',
        backgroundColor: '#F1FBFF',
      }}
      color="primary">
      <NotificationsIcon />
    </IconButton>
  )
}
