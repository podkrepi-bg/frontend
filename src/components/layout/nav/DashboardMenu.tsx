import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import Link from 'next/link'
import AddBoxIcon from '@mui/icons-material/AddBox'
import BusinessIcon from '@mui/icons-material/Business'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { DrawerStore } from 'stores/DrawerStore'
import { routes } from 'common/routes'

export default observer(function DashboardMenu() {
  const { t } = useTranslation()
  const { companySubMenu, toggleCompanySubMenu } = DrawerStore
  const router = useRouter()

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton
        onClick={toggleCompanySubMenu}
        selected={router.asPath.startsWith(routes.dashboard.index) && !companySubMenu}>
        <ListItemIcon>
          <BusinessIcon />
        </ListItemIcon>
        <ListItemText primary={t('nav.dashboard.companies.index')} />
        {companySubMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={companySubMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link passHref href={routes.dashboard.index}>
            <ListItemButton
              sx={{ pl: 4 }}
              component="a"
              selected={router.asPath == routes.dashboard.index}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.dashboard.companies.all')} />
            </ListItemButton>
          </Link>
          <Link passHref href={routes.dashboard.createCompany}>
            <ListItemButton
              sx={{ pl: 4 }}
              component="a"
              selected={router.asPath == routes.dashboard.createCompany}>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary={t('nav.dashboard.companies.create')} />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </List>
  )
})
