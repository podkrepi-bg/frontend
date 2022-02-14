import NotificationsIcon from '@mui/icons-material/Notifications'
import { IconButton } from '@mui/material'

export default function DashboardNotifications() {
  return (
    <IconButton
      size="large"
      sx={{
        marginRight: '4px',
      }}>
      <NotificationsIcon />
    </IconButton>
  )
}
