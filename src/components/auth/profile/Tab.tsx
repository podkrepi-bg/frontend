import { Box } from '@mui/material'
import { ReactNode } from 'react'

function Tab(props: { value: number; index: number; children: ReactNode }) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      <Box>{value === index && children}</Box>
    </div>
  )
}

export default Tab
