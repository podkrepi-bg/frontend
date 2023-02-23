import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import GridActions from 'components/admin/GridActions'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { ModalStore } from '../PersonGrid'
import { usePersonList } from 'common/hooks/person'
import { routes } from 'common/routes'
import { PersonResponse } from 'gql/person'

export default observer(function Grid() {
  const { t } = useTranslation()

  const { data }: UseQueryResult<PersonResponse[]> = usePersonList()

  const { isDetailsOpen } = ModalStore

  const [pageSize, setPageSize] = useState(5)

  const columns: GridColumns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: t('person:admin.fields.actions'),
      width: 150,
      align: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.person.edit(params.row.id)}
          />
        )
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'name',
      headerName: t('person:admin.fields.name'),
      editable: false,
      width: 400,
      valueGetter: (f) => {
        return `${f.row.firstName} ${f.row.lastName}`
      },
    },
    {
      field: 'email',
      headerName: t('person:admin.fields.email'),
      editable: false,
      width: 400,
      valueGetter: (f) => f.row.email,
    },
    {
      field: 'phone',
      headerName: t('person:admin.fields.phone'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.phone,
    },
    {
      field: 'createdAt',
      headerName: t('person:admin.fields.createdAt'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.createdAt?.toString().slice(0, 10),
    },
  ]

  return (
    <>
      <Box>
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          autoHeight
          disableSelectionOnClick
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
