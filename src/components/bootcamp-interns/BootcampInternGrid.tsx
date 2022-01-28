import { makeStyles } from '@mui/styles'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'
import { ButtonGroup, ListItemIcon, Typography } from '@mui/material'
import { drawerWidth } from './MyDrawer'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle'
import PageviewIcon from '@mui/icons-material/Pageview'

import InfoIcon from '@mui/icons-material/Info'

const useStyles = makeStyles((theme) => {
  return {
    internDataGrid: {
      marginLeft: drawerWidth,
    },
    dataGridHeader: {
      marginLeft: drawerWidth,
      marginTop: '40px',
    },
    icons: {
      cursor: 'pointer',
    },
  }
})

const hardCodedTypes = [
  { icon: <StarIcon color="action" /> },
  { icon: <CircleIcon color="success" /> },
  { icon: <CircleIcon color="error" /> },
  { icon: <StarIcon color="info" /> },
  { icon: <StarIcon color="error" /> },
  { icon: <StarIcon color="success" /> },
  { icon: <StarIcon color="info" /> },
  { icon: <CircleIcon color="warning" /> },
  { icon: <CircleIcon color="action" /> },
  { icon: <CircleIcon color="warning" /> },
  { icon: <CircleIcon color="secondary" /> },
  { icon: <CircleIcon color="primary" /> },
]
const getRandomType = (array: any) => array[Math.floor(Math.random() * hardCodedTypes.length)].icon
const iconsStyle = { cursor: 'pointer' }

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
    renderCell: () => getRandomType(hardCodedTypes),
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 250,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    renderCell: () => (
      <ButtonGroup>
        <InfoIcon style={iconsStyle} />
        <EditIcon style={iconsStyle} />
        <DeleteIcon style={iconsStyle} />
      </ButtonGroup>
    ),
    width: 340,
    align: 'center',
  },
]

export default function BootcampInternGrid(props: any) {
  const classes = useStyles()
  const { data } = useBootcampInternsList()

  return (
    <>
      <Typography variant="h1" align="center" className={classes.dataGridHeader}>
        Softuni Bootcamp Interns
      </Typography>
      <DataGrid
        className={classes.internDataGrid}
        style={{ marginTop: '50px' }}
        rows={data || []}
        columns={columns}
        pageSize={6}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
    </>
  )
}
