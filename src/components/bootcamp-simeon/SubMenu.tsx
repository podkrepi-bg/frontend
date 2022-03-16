import { ListItemButton } from '@mui/material'
import { useState } from 'react'

function SubMenu() {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItemButton></ListItemButton>
    </>
  )
}

export default SubMenu
