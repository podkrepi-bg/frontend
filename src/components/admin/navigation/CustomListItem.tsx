import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material'

type Props = {
  label?: string
  icon: React.ReactNode
} & ListItemProps

function CustomListItem({ label, icon, selected, ...props }: Props) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton selected={selected} sx={{ borderRadius: '20px' }}>
        <ListItemIcon title={label}>{icon}</ListItemIcon>
        {label && <ListItemText primary={label} />}
      </ListItemButton>
    </ListItem>
  )
}

export default CustomListItem
