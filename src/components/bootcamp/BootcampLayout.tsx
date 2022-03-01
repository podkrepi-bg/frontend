import { Box } from '@mui/system'
import * as React from 'react'
import BootCampAppBar from './ley-out-components/AppBar'

type Props = {
  children: React.ReactNode
}

export default function BootcampLayout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', position: 'relative', minHeight: '100vh', paddingRight: '24px' }}>
      <BootCampAppBar />
      {children}
    </Box>
  )
}
