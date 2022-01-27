import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

const transition = {
  enter: 0,
}

export default function NestedDrawer({ list, icon, mt }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)

  return (
    <>
      <IconButton size="small" edge="start" color="inherit" onClick={handleOpen}>
        {open ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
      </IconButton>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            height: 200,
            mt: mt || 10,
            ml: 2,
            border: 1,
            overflow: 'hidden',
          },
        }}
        transitionDuration={transition}
        variant="persistent"
        anchor="up"
        open={open}>
        <List>
          <List>
            {list.map((text) => (
              <>
                <ListItem button key={text}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </List>
      </Drawer>
    </>
  )
}
