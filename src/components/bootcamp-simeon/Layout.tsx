import { Box } from '@mui/material'
import * as React from 'react'
import BootcampAppbar from './Appbar'
import DrawerHeader from './DrawerHeader'
import BootcampFooter from './Footer'
import BootcampDrawer from './Drawer'

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
      <Box>
        <BootcampAppbar open={open} handler={handleDrawerOpenClose} />
        <BootcampDrawer open={open} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <BootcampFooter />
    </>
  )
}

export default Layout
