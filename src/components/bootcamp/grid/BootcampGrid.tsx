import React from 'react'
import { DataGrid, GridColumns, GridSelectionModel } from '@mui/x-data-grid'

import { useTasksList } from 'common/hooks/bootcamp'
import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import DeleteAllModal from './DeleteAllModal'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { observer } from 'mobx-react'

export default observer(function BootcampGrid() {
  const { data } = useTasksList()
  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])
  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', hide: true },
    {
      field: 'status',
      headerName: 'Статус',
      editable: false,
      width: 100,
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Заглавие',
      editable: false,
      width: 100,
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Емайл адрес',
      editable: false,
      width: 100,
      flex: 1,
    },
    {
      field: 'message',
      headerName: 'Съобщение',
      editable: false,
      width: 100,
      flex: 1.5,
    },
    {
      field: 'startDate',
      headerName: 'Начална Дата',
      editable: false,
      width: 100,
      flex: 1.5,
    },
    {
      field: 'endDate',
      headerName: 'Крайна дата',
      editable: false,
      width: 100,
      flex: 1.5,
    },
    {
      field: 'firstName',
      headerName: 'Име',
      editable: false,
      width: 100,
      flex: 1.5,
    },
    {
      field: 'lastName',
      headerName: 'Фамилия',
      editable: false,
      width: 100,
      flex: 1.5,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Действия',
      width: 100,
      headerAlign: 'left',
      renderCell: (p) => (
        <GridActions
          id={p.row.id}
          name={p.row.name}
          editLink={routes.admin.bootcamp.editBootcampById(p.row.id)}
        />
      ),
    },
  ]

  return (
    <>
      <DataGrid
        style={{
          background: 'white',
          position: 'absolute',
          height: 'calc(100vh - 300px)',
          border: 'none',
          width: 'calc(100% - 48px)',
          left: '24px',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '0 0 13px 13px',
        }}
        rows={data || []}
        columns={columns}
        pageSize={5}
        editMode="row"
        autoHeight
        autoPageSize
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
          setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
        }}
      />
      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
