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
import { useTranslation } from 'next-i18next'

export default observer(function DashboardMenu() {
  const { t } = useTranslation()
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
          <ListItemText primary={t('nav.bootcamp.students')} />
        </ListItemButton>
      </Link>
      <ListItemButton
        onClick={toggleSubMenu}
        selected={router.asPath.startsWith(routes.bootcamp.dashboard.pets) && !subMenuIsOpen}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary={t('nav.bootcamp.pets.index')} />
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
              <ListItemText primary={t('nav.bootcamp.pets.all')} />
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
              <ListItemText primary={t('nav.bootcamp.pets.create')} />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  )
})
