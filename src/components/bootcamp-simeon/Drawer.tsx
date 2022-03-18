import { Box, Button, Drawer } from '@mui/material'
import * as React from 'react'

function BootcampDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  return (
    <>
      <Button>Left menu</Button>
      <Drawer>
        <Box></Box>
      </Drawer>
    </>
  )
}

export default BootcampDrawer
