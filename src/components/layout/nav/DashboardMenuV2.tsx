import { List } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import Link from 'next/link'
import { ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { DrawerStore } from 'stores/DrawerStore'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

export default observer(function DashboardMenuV2() {
  const { subMenuIsOpen, toggleSubMenu } = DrawerStore
  const router = useRouter()

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <Link passHref href={routes.bootcamp.dashboard.index}>
        <ListItemButton component="a" selected={router.asPath == routes.bootcamp.dashboard.index}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Bootcamp students" />
        </ListItemButton>
      </Link>
      <ListItemButton
        onClick={toggleSubMenu}
        selected={router.asPath.startsWith(routes.bootcamp.dashboard.pets) && !subMenuIsOpen}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Pets" />
        {subMenuIsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={subMenuIsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link passHref href={routes.bootcamp.dashboard.pets}>
            <ListItemButton
              sx={{ pl: 4 }}
              component="a"
              selected={router.asPath == routes.bootcamp.dashboard.pets}>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
          </Link>
          <Link passHref href={routes.bootcamp.dashboard.createPet}>
            <ListItemButton
              sx={{ pl: 4 }}
              component="a"
              selected={router.asPath == routes.bootcamp.dashboard.createPet}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  )
})
