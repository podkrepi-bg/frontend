import DashboardIcon from '@mui/icons-material/Dashboard'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import BasicPopover from 'components/bootcamp/BasicPopover'
import PetsIcon from '@mui/icons-material/Pets'
import AddBoxIcon from '@mui/icons-material/AddBox'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import CakeIcon from '@mui/icons-material/Cake'
import IcecreamIcon from '@mui/icons-material/Icecream'
import LunchDiningIcon from '@mui/icons-material/LunchDining'

export default function DashboardMenu() {
  return (
    <List>
      <ListItemButton component="a" href="/bootcamp/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <BasicPopover title="Pets" icon={<PetsIcon />}>
        <List>
          <ListItemButton component="a" href="/bootcamp/dashboard/pets">
            <ListItemIcon>
              <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="All pets" />
          </ListItemButton>
          <ListItemButton component="a" href="/bootcamp/dashboard/pets/create">
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Create pet" />
          </ListItemButton>
        </List>
      </BasicPopover>
      <BasicPopover title="Food" icon={<RestaurantIcon />}>
        <List>
          <ListItemButton component="a" href="/bootcamp/dashboard">
            <ListItemIcon>
              <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="Restaurants" />
          </ListItemButton>
          <BasicPopover title="Fast food" icon={<FastfoodIcon />}>
            <List>
              <ListItemButton component="a" href="/bootcamp/dashboard">
                <ListItemIcon>
                  <CakeIcon />
                </ListItemIcon>
                <ListItemText primary="Cakes" />
              </ListItemButton>
              <ListItemButton component="a" href="/bootcamp/dashboard">
                <ListItemIcon>
                  <IcecreamIcon />
                </ListItemIcon>
                <ListItemText primary="Ice cream" />
              </ListItemButton>
              <ListItemButton component="a" href="/bootcamp/dashboard">
                <ListItemIcon>
                  <LunchDiningIcon />
                </ListItemIcon>
                <ListItemText primary="Burgers" />
              </ListItemButton>
            </List>
          </BasicPopover>
        </List>
      </BasicPopover>
    </List>
  )
}
