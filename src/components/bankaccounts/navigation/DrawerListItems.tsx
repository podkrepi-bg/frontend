import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { Button, List, ListItemIcon } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import NestedMenu from './NestedMenu'
import { routes } from 'common/routes'
const menuItems = [
  { name: 'Начало', link: routes.bankaccounts.index },
  { name: 'Банкови сметки', link: routes.bankaccounts.index },
  { name: 'Настройки', link: routes.bankaccounts.index },
]

function DrawerListItems() {
  const router = useRouter()
  return (
    <List
      sx={{
        marginTop: { xs: '100px', sm: '-20px' },
        display: 'flex',
        flexDirection: 'column',
      }}>
      <NestedMenu />
      {menuItems.map((item) => (
        <ListItem
          onClick={() => router.push(item.link)}
          button
          key={item.name}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'left' },
            padding: '10px',
          }}>
          <ListItemIcon sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {item.name == 'Начало' ? (
              <HomeIcon />
            ) : item.name === 'Банкови сметки' ? (
              <DirectionsCarIcon />
            ) : (
              <SettingsIcon />
            )}
          </ListItemIcon>
          <Button sx={{ display: { xs: 'none', sm: 'block' } }}>{item.name}</Button>
          <Button sx={{ display: { xs: 'block', sm: 'none' }, width: '96%' }} variant="outlined">
            {item.name}
          </Button>
        </ListItem>
      ))}
    </List>
  )
}

export default DrawerListItems
