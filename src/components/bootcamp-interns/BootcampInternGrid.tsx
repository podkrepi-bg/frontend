import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useBootcampInternsList } from 'common/hooks/bootcampIntern'
import BootcampInternCreateForm from './BootcampInternCreateForm'

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
]

export default function BootcampInternGrid() {
  const { data } = useBootcampInternsList()
  return (
    <DataGrid
      style={{ marginTop: '50px' }}
      rows={data || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
    />
  )
}
