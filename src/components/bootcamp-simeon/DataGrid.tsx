import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { useBootcampSimeonList } from 'common/hooks/bootcamp-simeon'
import { useMutation, useQueryClient } from 'react-query'
import { deleteBootcampSimeon } from 'service/restRequests/bootcamp-simeon'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
import { endpoints } from 'service/apiEndpoints'
import { useRouter } from 'next/router'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

function BootcampDataGrid() {
  const { t } = useTranslation()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [openClose, setOpenClose] = React.useState(false)
  const closeModal = () => setOpenClose(false)

  const mutationDelete = useMutation({
    mutationFn: deleteBootcampSimeon,
    onError: () => AlertStore.show(t('bootcamp-simeon:alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      closeModal()
      AlertStore.show(t('bootcamp:alerts.delete-row.success'), 'success')
      queryClient.invalidateQueries(endpoints.bootcampSimeon.listAll.url)
    },
  })

  const { data = [] } = useBootcampSimeonList()
  console.log(data)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default BootcampDataGrid
