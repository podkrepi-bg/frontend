import React, { useState } from 'react'
import CarsDrawer from './CarsDrawer'
import CarsAppBar from './CarsAppBar'

export default function CarsNavBar() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <CarsAppBar handleOpen={handleOpen} />
      <CarsDrawer open={open} handleClose={handleClose} />
    </>
  )
}
