import { Box } from '@mui/system'
import * as React from 'react'
import BootCampAppBar from './AppBar'
import BootcampDrawer from './Drawer'
import DrawerHeader from './DrawerHeader'
import BootcampFooter from './Footer'
import Snackbar from 'components/layout/Snackbar'

type Props = {
  children: React.ReactNode
}

export default function BootcampLayout({ children }: Props) {
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
        <BootCampAppBar open={open} handler={handleDrawerOpenClose} />
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
