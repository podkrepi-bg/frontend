import React, { useEffect, useState } from 'react'
import { Collapse, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function SubList({ drawerOpen, title, icon, data }: any) {
  const [open, setOpen] = useState(false)
  const handleClick = () => setOpen(!open)

  useEffect(() => {
    if (sessionStorage.getItem(title)) {
      setOpen(JSON.parse(sessionStorage.getItem(title) || ''))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(title, JSON.stringify(open))
  }, [open])

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem('drawer-state') || '')) {
      setOpen(JSON.parse(sessionStorage.getItem(title) || ''))
    }
  }, [drawerOpen])

  return (
    <>
      <ListItem button key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        <IconButton size="small" edge="start" color="inherit" onClick={handleClick}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout={0} unmountOnExit>
        {data.map((x: any) => (
          <ListItem button key={x.toString()}>
            <ListItemText primary={x} />
          </ListItem>
        ))}
      </Collapse>
    </>
  )
}
