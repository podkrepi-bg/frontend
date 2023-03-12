import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'

import { Box } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { useIrregularityList } from 'common/hooks/irregularity'

import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { ModalStore } from '../IrregularityPage'
import { IrregularityResponse } from 'components/client/irregularity/helpers/irregularity.types'

export default observer(function Grid() {
  const { t } = useTranslation('irregularity')

  const { data }: UseQueryResult<IrregularityResponse[]> = useIrregularityList()

  const { isDetailsOpen } = ModalStore

  const [pageSize, setPageSize] = useState(5)

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'status',
      headerName: t('admin.fields.status'),
      editable: false,
      width: 150,
      valueGetter: (f) => {
        return t('admin.fields.status-type.' + f.row.status)
      },
    },
    {
      field: 'createdAt',
      headerName: t('admin.fields.createdAt'),
      editable: false,
      width: 150,
      valueGetter: (f) => f.row.createdAt?.toString().slice(0, 10),
    },
    {
      field: 'campaign',
      headerName: t('admin.fields.campaign'),
      editable: false,
      width: 300,
      valueGetter: (f) => f.row.campaign.title,
    },
    {
      field: 'reason',
      headerName: t('admin.fields.reason'),
      editable: false,
      width: 200,
      valueGetter: (f) => {
        return t('reason.' + f.row.reason)
      },
    },
    {
      field: 'description',
      headerName: t('admin.fields.description'),
      editable: false,
      width: 300,
    },
    {
      field: 'person',
      headerName: t('admin.fields.person'),
      editable: false,
      width: 300,
      valueGetter: (f) => `${f.row.person.firstName} ${f.row.person.lastName}`,
    },
    {
      field: 'notifierType',
      headerName: t('admin.fields.type'),
      editable: false,
      width: 150,
      valueGetter: (f) => {
        return t('admin.fields.notifier-type.' + f.row.notifierType)
      },
    },
    {
      field: 'email',
      headerName: t('admin.fields.email'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.person.email,
    },
    {
      field: 'phone',
      headerName: t('admin.fields.phone'),
      editable: false,
      width: 150,
      valueGetter: (f) => f.row.person.phone,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: t('admin.fields.actions'),
      width: 200,
      align: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.irregularity.view(params.row.id)}
          />
        )
      },
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
