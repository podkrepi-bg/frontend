import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { Box, Container, Link } from '@mui/material'

function CustomLayout({ children, title }: { children: any; title: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Подкрепи БГ
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {/* {['Create', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <AddBoxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
            <ListItem button>
              <IconButton href="/bootcamp">
                <AddBoxIcon fontSize="small"></AddBoxIcon>
              </IconButton>
              <Button href="/bootcamps/grid">All bootcamps</Button>
            </ListItem>
            <ListItem>
              <IconButton href="/bootcamps/create">
                <AddBoxIcon fontSize="small"></AddBoxIcon>
              </IconButton>
              <Button href="/bootcamps/create">Add bootcamp</Button>
            </ListItem>
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph></Typography>
        </Box>
      </Box>
      <Container maxWidth="lg">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Container>
      <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <p style={{ textAlign: 'center' }}>footer text</p>
      </footer>
    </>
  )
}

export default CustomLayout
