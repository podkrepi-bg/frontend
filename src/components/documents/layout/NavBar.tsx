import React, { useEffect, useState } from 'react'

import Drawer from 'components/documents/layout/DocumentsDrawer'
import AppBar from 'components/documents/layout/AppBar'

export default function NavBar() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    if (sessionStorage.getItem('drawer-state')) {
      setOpen(JSON.parse(sessionStorage.getItem('drawer-state') || ''))
    } else {
      sessionStorage.setItem('drawer-state', JSON.stringify(open))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('drawer-state', JSON.stringify(open))
  }, [open])

  return (
    <>
      <AppBar handleOpen={handleOpen} />
      <Drawer open={open} setOpen={setOpen} />
    </>
  )
}
