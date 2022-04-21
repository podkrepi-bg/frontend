import {
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from '@mui/material'

type Props = {
  label?: string
  icon: React.ReactNode
} & Omit<ListItemProps, 'selected'> &
  Pick<ListItemButtonProps, 'selected'>

function CustomListItem({ label, icon, selected, ...props }: Props) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton selected={selected}>
        <ListItemIcon
          title={label}
          sx={(theme) => ({
            color: selected ? theme.palette.primary.main : theme.palette.action.active,
          })}>
          {icon}
        </ListItemIcon>
        {label && (
          <ListItemText
            primary={label}
            primaryTypographyProps={{ color: selected ? 'primary' : undefined }}
          />
        )}
      </ListItemButton>
    </ListItem>
  )
}

export default CustomListItem
