import React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useCarsList } from 'common/hooks/useCarsList'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
import StarIcon from '@mui/icons-material/Star'
const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'type',
    headerName: 'тип',
    width: 50,
    renderCell: (cellValues: any) => {
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <StarIcon color="error" />
        </div>
      )
    },
  },
  {
    field: 'taskName',
    headerName: 'име на задачата',
    width: 280,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
  {
    field: 'keyword',
    headerName: 'кл.дума',
    width: 100,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
  {
    field: 'description',
    headerName: 'описание',
    width: 220,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
  {
    field: 'status',
    headerName: 'статус',
    width: 80,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
  {
    field: 'deadline',
    headerName: 'краен срок',
    width: 120,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
  {
    field: 'operator',
    headerName: 'оператор',
    width: 100,
    renderCell: (cellValues) => {
      return (
        <div style={{ fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
          {cellValues.value}
        </div>
      )
    },
  },
]

export default function CarsGrid() {
  const modal: any = useContext(ModalContext)
  const data: any = [
    {
      id: '1',
      type: 'star',
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
      onRowClick={(car) => {
        const id = car.getValue(car.id, 'id')
        if (typeof id !== 'string') return
        router.push(routes.admin.cars.view(id))
        modal.openModal()
      }}
    />
  )
}
