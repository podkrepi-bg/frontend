import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { CoordinatorResponse } from 'gql/coordinators'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../CoordinatorsPage'
import { commonProps } from './CoordinatorsGridHelper'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default function CoordinatorsGrid() {
  const columns: GridColDef[] = [
    {
      field: 'others',
      headerName: 'Действия',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      width: 120,
      renderCell: (p: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={p.row.id}
            name={`${p.row.person.firstName} ${p.row.person.lastName}`}
          />
        )
      },
    },
    {
      ...commonProps,
      headerName: 'Име',
      field: 'status',
      renderCell: (row) => `${row.row.person.firstName} ${row.row.person.lastName}`,
    },
    {
      ...commonProps,
      headerName: 'Имейл',
      field: 'ibanNumber',
      width: 220,
      renderCell: (row) => `${row.row.person.email}`,
    },
    {
      ...commonProps,
      headerName: 'Телефон',
      field: 'accountHolderName',
      flex: 1,
      renderCell: (row) => `${row.row.person.phone}`,
    },
  ]

  const { data }: UseQueryResult<CoordinatorResponse[]> = useCoordinatorsList()
  const { isDetailsOpen } = ModalStore
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })

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
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
      />

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
}
