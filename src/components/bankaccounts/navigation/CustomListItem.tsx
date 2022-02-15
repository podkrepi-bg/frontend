import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'

function CustomListItem({ name }: { name: string }) {
  return (
    <ListItem button sx={{ px: '7px', borderRadius: '20px' }}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  )
}

export default CustomListItem
