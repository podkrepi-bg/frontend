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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail'
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';


import { Box, Container, CssBaseline, Link, List, styled, useTheme } from '@mui/material'
import Footer from './Footer'

function Layout({ children, title }: { children: any; title: string }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <IconButton href="/"></IconButton>
            <Typography variant="h6" noWrap component="div" style={{ textAlign: "center" }}>
              Bootcampers Module
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={open}
        >
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
          <Divider />
          <List>
            <ListItem button>
              <IconButton href="/bootcamp"><ListIcon fontSize="small"></ListIcon></IconButton><Button style={{ color: "black" }} href="/bootcamp">All bootcampers</Button>
            </ListItem>
            <ListItem>
              <IconButton href="/bootcamp/add"><AddBoxIcon fontSize="small"></AddBoxIcon></IconButton><Button style={{ color: "black" }} href="/bootcamp/add">Add bootcamper</Button>
            </ListItem>
          </List>
        </Drawer>
      </Box >
      <Container maxWidth="lg">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Container>
      <Footer />
    </>
  )
}
export default Layout
