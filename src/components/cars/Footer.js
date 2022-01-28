import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import { Divider, Typography } from '@mui/material'

export default function Footer() {
  return (
    <>
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          height: '2.5rem',
          borderTop: 1,
          borderTopColor: 'lightgrey',
        }}>
        Copyright @Podkrepi.bg
      </Typography>
    </>
  )
}
