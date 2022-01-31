import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { List } from '@mui/material'
import CollapseNavItem from 'components/bootcamp/CollapseNavItem'
import PetsIcon from '@mui/icons-material/Pets'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DashboardIcon from '@mui/icons-material/Dashboard'

export default function DashboardMenuV2() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton component="a" href="/bootcamp/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Bootcamp students" />
      </ListItemButton>
      <CollapseNavItem title="Pets" icon={<PetsIcon />}>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} component="a" href="/bootcamp/dashboard/pets">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} component="a" href="/bootcamp/dashboard/pets/create">
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Create" />
          </ListItemButton>
        </List>
      </CollapseNavItem>
    </List>
  )
}
