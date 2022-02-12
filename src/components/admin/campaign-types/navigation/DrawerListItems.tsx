import AddIcon from '@mui/icons-material/Add'
import { Button, List, ListItemIcon } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ListItem from '@mui/material/ListItem'
import { useRouter } from 'next/router'
import NestedMenu from './NestedMenu'
const menuItems = [
  { name: 'All campaign types', link: '/admin/campaign-types' },
  { name: 'Add campaign type', link: '/admin/campaign-types/add' },
  { name: 'Settings', link: '/admin/campaign-types' },
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
            {item.name == 'All campaign types' ? (
              <FormatListBulletedIcon />
            ) : item.name === 'Add campaign type' ? (
              <AddIcon />
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
