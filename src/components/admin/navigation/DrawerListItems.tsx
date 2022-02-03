import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { Button, List, ListItemIcon } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import HomeIcon from '@mui/icons-material/Home'
import ListItem from '@mui/material/ListItem'
import NestedMenu from './NestedMenu'

function DrawerListItems() {
  return (
    <List
      sx={{
        marginTop: { xs: '100px', sm: '-20px' },
        display: 'flex',
        flexDirection: 'column',
      }}>
      <NestedMenu />
      {['Начало', 'Коли', 'Настройки'].map((text) => (
        <ListItem
          button
          key={text}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', sm: 'left' },
            padding: '10px',
          }}>
          <ListItemIcon sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {text == 'Начало' ? (
              <HomeIcon />
            ) : text === 'Коли' ? (
              <DirectionsCarIcon />
            ) : (
              <SettingsIcon />
            )}
          </ListItemIcon>
          <Button sx={{ display: { xs: 'none', sm: 'block' } }}>{text}</Button>
          <Button sx={{ display: { xs: 'block', sm: 'none' }, width: '96%' }} variant="outlined">
            {text}
          </Button>
        </ListItem>
      ))}
    </List>
  )
}

export default DrawerListItems
