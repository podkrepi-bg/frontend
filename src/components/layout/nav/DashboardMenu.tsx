import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import BusinessIcon from '@mui/icons-material/Business'
import SettingsIcon from '@mui/icons-material/Settings'
import CancelIcon from '@mui/icons-material/Cancel'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { DrawerStore } from 'stores/DrawerStore'

const useStyles = makeStyles(() => {
  return {
    listItem: {
      borderRadius: '100px',
      width: '160px',
      height: '36px',
      margin: '0 16px',
      padding: '8px 10px',
      color: '#00000099',
    },
    shrink: {
      width: '36px',
      height: '36px',
      padding: '10px',
    },
    listItemActive: {
      backgroundColor: '#D0F0FF',
    },
  }
})

export default observer(function DashboardMenu() {
  const { t } = useTranslation()
  const { companySubMenu, toggleCompanySubMenu, isOpen, toggleFullClosed, toggle } = DrawerStore
  const router = useRouter()
  const classes = useStyles()
  const closeDrawerHandler = () => {
    toggleFullClosed()
    if (isOpen) {
      toggle()
    }
    if (companySubMenu) {
      toggleCompanySubMenu()
    }
  }

  const submenuToggleHandler = () => {
    if (!isOpen && !companySubMenu) {
      toggle()
    }
    toggleCompanySubMenu()
  }

  return (
    <List
      sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <Box>
        <ListItemButton
          onClick={submenuToggleHandler}
          className={`${classes.listItem} ${isOpen ? '' : classes.shrink} ${
            router.asPath.startsWith(routes.dashboard.index) ? classes.listItemActive : ''
          }`}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <BusinessIcon
              style={{
                width: '15px',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary={t('companies:companies')} sx={{ fontSize: '16px' }} />}
        </ListItemButton>
        <Collapse in={companySubMenu} timeout="auto" unmountOnExit>
          <Link passHref href={routes.dashboard.companies}>
            <a>
              <ListItemButton className={classes.listItem}>{t('companies:all')}</ListItemButton>
            </a>
          </Link>
          <Link passHref href={routes.dashboard.createCompany}>
            <a>
              <ListItemButton className={classes.listItem}>{t('companies:cta.add')}</ListItemButton>
            </a>
          </Link>
        </Collapse>
      </Box>
      <Box sx={{ marginBottom: '16px' }}>
        <ListItemButton
          onClick={closeDrawerHandler}
          className={`${classes.listItem} ${isOpen ? '' : classes.shrink}`}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <CancelIcon
              style={{
                width: '15px',
              }}
            />
          </ListItemIcon>
          {isOpen && <ListItemText primary={t('common:close')} sx={{ fontSize: '16px' }} />}
        </ListItemButton>
        <ListItemButton className={`${classes.listItem} ${isOpen ? '' : classes.shrink}`}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <SettingsIcon
              style={{
                width: '15px',
              }}
            />
          </ListItemIcon>
          {isOpen && (
            <ListItemText
              primary={t('nav.dashboard.profile-menu.settings')}
              sx={{ fontSize: '16px' }}
            />
          )}
        </ListItemButton>
      </Box>
    </List>
  )
})
