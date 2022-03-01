import { Box } from '@mui/system'
import * as React from 'react'
import BootCampAppBar from './leyout-components/AppBar'
import BootcampDrawer from './leyout-components/Drawer'
import DrawerHeader from './leyout-components/DrawerHeader'

type Props = {
  children: React.ReactNode
}

export default function BootcampLayout({ children }: Props) {
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpenClose = () => {
    open ? setOpen(false) : setOpen(true)
  }
  return (
    <Box sx={{ display: 'flex', position: 'relative', minHeight: '100vh', paddingRight: '24px' }}>
      <BootCampAppBar open={open} handler={handleDrawerOpenClose} />
      <BootcampDrawer open={open} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
}
