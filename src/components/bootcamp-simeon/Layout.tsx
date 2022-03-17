import { Box } from '@mui/material'
import * as React from 'react'
import BootcampAppbar from './Appbar'
import DrawerHeader from './DrawerHeader'
import BootcampFooter from './Footer'
import BootcampDrawer from './Drawer'
import Snackbar from '../layout/Snackbar'

interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpenClose = () => {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          minHeight: '100vh',
          paddingRight: '24px',
          marginBottom: 10,
        }}>
        <BootcampAppbar open={open} handler={handleDrawerOpenClose} />
        <BootcampDrawer open={open} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <Snackbar />
      <BootcampFooter />
    </>
  )
}

export default Layout
