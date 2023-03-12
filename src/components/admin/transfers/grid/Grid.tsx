import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { TransferResponse } from 'gql/transfer'
import GridActions from 'components/admin/GridActions'
import { useTransferList } from 'common/hooks/transfers'

import { ModalStore } from '../TransferPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { fromMoney } from 'common/util/money'

export default observer(function Grid() {
  const { t } = useTranslation('transfer')

  const { data }: UseQueryResult<TransferResponse[]> = useTransferList()
  const { isDetailsOpen } = ModalStore

  const [pageSize, setPageSize] = useState(5)

  const columns: GridColumns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: t('actions'),
      width: 200,
      align: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.transfer.view(params.row.id)}
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
      field: 'status',
      headerName: t('status'),
      editable: false,
      width: 100,
    },
    {
      field: 'currency',
      headerName: t('currency'),
      editable: false,
      width: 100,
    },
    {
      field: 'amount',
      headerName: t('amount'),
      editable: false,
      width: 100,
      valueGetter: (f) => fromMoney(f.row.amount),
    },
    {
      field: 'documentId',
      headerName: t('documentId'),
      editable: false,
      width: 200,
    },
    {
      field: 'targetDate',
      headerName: t('targetDate'),
      editable: false,
      width: 100,
      valueGetter: (f) => f.row.targetDate?.toString().slice(0, 10),
    },
    {
      field: 'sourceCampaign',
      headerName: t('sourceCampaign'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.sourceCampaign.title,
    },
    {
      field: 'sourceVault',
      headerName: t('sourceVault'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.sourceVault.name,
    },
    {
      field: 'approvedBy',
      headerName: t('approvedBy'),
      editable: false,
      width: 150,
      valueGetter: (f) =>
        f.row.approvedBy ? `${f.row.approvedBy.firstName} ${f.row.approvedBy.lastName}` : '',
    },
    {
      field: 'reason',
      headerName: t('reason'),
      editable: false,
      width: 200,
    },
    {
      field: 'targetCampaign',
      headerName: t('targetCampaign'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.targetCampaign.title,
    },
    {
      field: 'targetVault',
      headerName: t('targetVault'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.targetVault.name,
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
