import { Box } from '@mui/material'
import * as React from 'react'
import BootcampAppbar from './Appbar'
import BootcampFooter from './Footer'

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
      </Box>
      <BootcampFooter />
    </>
  )
}

export default Layout
