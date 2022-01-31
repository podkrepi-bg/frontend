import { useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'

type Props = {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export default function CollapseNavItem({ title, icon, children }: Props) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}
