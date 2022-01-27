import { DataGrid } from '@mui/x-data-grid'
import { columns } from './gridColumns'
import { data } from './fakeData'

export default function TasksGrid() {
  return (
    <DataGrid
      style={{
        marginTop: '2px',
        background: 'white',
        height: 'calc(100vh - 400px)',
        border: 'none',
      }}
      rows={data || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
      onRowClick={() => {
        console.log('clicked')
      }}
    />
  )
}
