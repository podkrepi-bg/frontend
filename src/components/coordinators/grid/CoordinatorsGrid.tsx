import React from 'react'
import { UseQueryResult } from 'react-query'
import { GridColumns, DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { CoordinatorResponse } from 'gql/coordinators'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import GridActions from 'components/admin/GridActions'

import { commonProps } from './CoordinatorsGridHelper'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default function CoordinatorsGrid() {
  const columns: GridColumns = [
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
    {
      field: 'others',
      headerName: 'Действия',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      width: 180,
      renderCell: (p: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions id={p.row.id} name={`${p.row.person.firstName} ${p.row.person.lastName}`} />
        )
      },
    },
  ]

  const { data }: UseQueryResult<CoordinatorResponse[]> = useCoordinatorsList()

  return (
    <>
      <DetailsModal />
      <DeleteModal />
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
        rowsPerPageOptions={[5, 10]}
        pageSize={10}
        autoHeight
        autoPageSize
        disableSelectionOnClick
      />
    </>
  )
}
