import { Button, Drawer } from '@mui/material'
import * as React from 'react'
import DrawerList from './DrawerList'

function BootcampDrawer() {
  type Anchor = 'top' | 'left' | 'right' | 'bottom'

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
    <>
      <Button onClick={toggleDrawer('left', true)}>Left menu</Button>
      <Drawer>
        <DrawerList {...'left'} />
      </Drawer>
    </>
  )
}

export default BootcampDrawer
