import MenuAppBar from './AppBar'
import MyDataGrid from './DataGrid'
import TemporaryDrawer from './Drawer'
import Box from '@mui/material/Box'

const boxStyles = {
  display: 'flex',
  marginTop: 10,
}

const BootcampComponent = () => {
  return (
    <>
      <MenuAppBar />
      <Box sx={boxStyles}>
        <TemporaryDrawer />
        <MyDataGrid />
      </Box>
    </>
  )
}

export default BootcampComponent
