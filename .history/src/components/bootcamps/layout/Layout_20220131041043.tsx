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
      <Footer />
    </>
  )
}
export default Layout
