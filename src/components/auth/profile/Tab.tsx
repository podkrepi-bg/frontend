import { Box } from '@mui/material'

function Tab(props: any) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      <Box sx={{ p: 3 }}>{value === index && children}</Box>
    </div>
  )
}

export default Tab
