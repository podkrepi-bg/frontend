import { Calculate } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'
import { routes } from 'common/routes'
import { useRouter } from 'next/router'
import { ButtonGroup, ListItemIcon } from '@mui/material'
import { drawerWidth } from './MyDrawer'
import { Button } from '@mui/material'

import StarIcon from '@mui/icons-material/Star'
import CircleIcon from '@mui/icons-material/Circle'

const useStyles = makeStyles((theme) => {
  return {
    internDataGrid: {
      marginLeft: drawerWidth,
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
        <Button variant="contained" color="error" size="small">
          Delete
        </Button>
        <Button variant="contained" color="success" size="small" style={{ padding: '8px' }}>
          Edit
        </Button>
      </ButtonGroup>
    ),
    width: 350,
    align: 'center',
  },
]

export default function BootcampInternGrid(props: any) {
  const classes = useStyles()
  const router = useRouter()
  const { data } = useBootcampInternsList()

  return (
    <DataGrid
      className={classes.internDataGrid}
      style={{ marginTop: '35px' }}
      rows={data || []}
      columns={columns}
      pageSize={3}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
    />
  )
}
