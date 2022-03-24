import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import * as React from 'react'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Link from 'next/link'

export default function SubMenu() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <ListItemButton
        sx={{ background: 'rgba(74, 195, 255, 0.26)', borderRadius: '100px' }}
        onClick={handleClick}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Задачи" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link passHref href="/bootcamp">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Симеон" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  )
}
