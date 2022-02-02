import React, { useEffect, useLayoutEffect, useState } from 'react'
import CarsDrawer from './CarsDrawer'
import CarsAppBar from './CarsAppBar'

export default function CarsNavBar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true)

  useEffect(() => {
    if (sessionStorage.getItem('drawer-state')) {
      setOpen(JSON.parse(sessionStorage.getItem('drawer-state')));
    } else {
      sessionStorage.setItem('drawer-state', open)
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('drawer-state', open)
  }, [open]);


  return (
    <>
      <CarsAppBar handleOpen={handleOpen} />
      <CarsDrawer open={open} setOpen={setOpen} />
    </>
  )
}
