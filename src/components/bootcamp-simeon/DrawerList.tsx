import { Box, Divider, List } from '@mui/material'
import * as React from 'react'

type Anchor = 'top' | 'left' | 'right' | 'bottom'

function DrawerList(anchor: Anchor) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}>
      <List></List>
      <Divider />
      <List></List>
    </Box>
  )
}

export default DrawerList
