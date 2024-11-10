import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { GridColDef, DataGrid, GridRenderCellParams } from '@mui/x-data-grid'

import { CoordinatorResponse } from 'gql/coordinators'
import { useCoordinatorsList } from 'common/hooks/coordinators'
import theme from 'common/theme'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../CoordinatorsPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { useTranslation } from 'next-i18next'

export default function CoordinatorsGrid() {
  const { t } = useTranslation('coordinator')
  const columns: GridColDef[] = [
    {
      field: 'others',
      headerName: t('fields.actions'),
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
            name={p.row.person.firstName + ' ' + p.row.person.lastName}
          />
        )
      },
    },
    {
      headerName: t('fields.name'),
      field: 'name',
      renderCell: (p) => p.row.person.firstName + ' ' + p.row.person.lastName,
      valueGetter: (p) => p.row.person.firstName,
      width: 200,
    },
    {
      headerName: t('fields.email'),
      field: 'email',
      valueGetter: (p) => p.row.person.email,
      width: 250,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <a
            href={`mailto:${params.row.person.email}`}
            style={{
              textDecoration: 'underline',
              color: '#0070f3',
              cursor: 'pointer',
            }}>
            {params.row.person.email}
          </a>
        )
      },
    },
    {
      headerName: t('fields.phone'),
      field: 'phone',
      flex: 1,
      renderCell: (p) => p.row.person.phone,
      valueGetter: (p) => p.row.person.phone,
      width: 150,
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
        sx={{
          background: theme.palette.common.white,
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
