import Layout from 'components/admin/Layout'
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import { useCoordinatorList } from 'common/hooks/coordinators'

function Coordinator() {
  const { data = [] } = useCoordinatorList()

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
      flex: 2,
    },
    {
      field: 'email',
      headerName: 'Email',
      valueGetter: (p) => p.row.person.email,
      flex: 3,
    },
    {
      field: 'company',
      headerName: 'Company',
      valueGetter: (p) => p.row.person.company,
      flex: 2,
    },
  ]

  return (
    <Layout>
      <h1>All coordinators</h1>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
      />
    </Layout>
  )
}

export default Coordinator
