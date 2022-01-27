import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import MailIcon from '@mui/icons-material/Mail'
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize'
import CarRentalIcon from '@mui/icons-material/CarRental'
import InboxIcon from '@mui/icons-material/Inbox'
import BrandsDrawer from './BrandsDrawer'
import ModelsDrawer from './ModelsDrawer'
import SearchBar from './SearchBar'
import fetch from 'node-fetch'

export default function CarsNavBar({ cars, setCars }) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const carMenu = [
    {
      text: 'Top Brands',
      icon: <DirectionsCarIcon />,
      props: <BrandsDrawer />,
    },
    {
      text: 'New Models',
      icon: <CarRentalIcon />,
      props: <ModelsDrawer />,
    },
    {
      text: 'Customize',
      icon: <DashboardCustomizeIcon />,
    },
  ]
  const emailMenu = [
    {
      text: 'Inbox',
      icon: <InboxIcon />,
    },
    {
      text: 'Send email',
      icon: <MailIcon />,
    },
  ]

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleOpen}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cars
          </Typography>
          <SearchBar cars={cars} setCars={setCars} />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: 200,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            p: 2,
          }}>
          <IconButton onClick={handleClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </Box>
        <Divider />
        <List>
          {carMenu.map(({ text, icon, props }) => (
            <ListItem button key={text}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
              {props}
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {emailMenu.map(({ text, icon }) => (
            <ListItem button key={text}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
