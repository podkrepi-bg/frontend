import React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useCarsList } from 'common/hooks/useCarsList'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'taskName',
    headerName: 'Task',
    width: 280,
  },
  {
    field: 'keyword',
    headerName: 'Key Word',
    width: 100,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 220,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 80,
  },
  {
    field: 'deadline',
    headerName: 'Deadline',
    width: 120,
  },
  {
    field: 'operator',
    headerName: 'Operator',
    width: 100,
  },
]

export default function CarsGrid() {
  const modal: any = useContext(ModalContext)
  const data: any = [
    {
      id: '1',
      taskName: 'Да помогнем на Радост да проходи',
      keyword: 'Договори',
      description: 'Експериментално лечение',
      status: '50%',
      deadline: 'остават 7 дни',
      operator: 'Ivan',
    },
    {
      id: '2',
      taskName: 'Да помогнем на Радост да проходи',
      keyword: 'Договори',
      description: 'Експериментално лечение',
      status: '50%',
      deadline: 'остават 7 дни',
      operator: 'Ivan',
    },
    {
      id: '3',
      taskName: 'Да помогнем на Радост да проходи',
      keyword: 'Договори',
      description: 'Експериментално лечение',
      status: '50%',
      deadline: 'остават 7 дни',
      operator: 'Ivan',
    },
    {
      id: '4',
      taskName: 'Да помогнем на Радост да проходи',
      keyword: 'Договори',
      description: 'Експериментално лечение',
      status: '50%',
      deadline: 'остават 7 дни',
      operator: 'Ivan',
    },
    {
      id: '5',
      taskName: 'Да помогнем на Радост да проходи',
      keyword: 'Договори',
      description: 'Експериментално лечение',
      status: '50%',
      deadline: 'остават 7 дни',
      operator: 'Ivan',
    },
  ]
  const router = useRouter()
  return (
    <DataGrid
      style={{
        marginTop: '1px',
        background: 'white',
        height: 'calc(100vh - 200px)',
        border: 'none',
      }}
      rows={data || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
      onRowClick={(car) => {
        const id = car.getValue(car.id, 'id')
        if (typeof id !== 'string') return
        router.push(routes.admin.cars.view(id))
        modal.openModal()
      }}
    />
  )
}
