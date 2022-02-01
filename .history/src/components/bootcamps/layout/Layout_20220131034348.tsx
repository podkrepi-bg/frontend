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
import { Box, Container, CssBaseline, Link } from '@mui/material'

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
     <Drawer/>
      <Container maxWidth="lg">
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Container>
      <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <p style={{ textAlign: 'center' }}>footer text</p>
      </footer>
    </Drawer>
  )
}

export default CustomLayout
