import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { WithdrawalResponse } from 'gql/withdrawals'
import GridActions from 'components/admin/GridActions'
import { useWithdrawalsList } from 'common/hooks/withdrawals'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'

export default function Grid() {
  const { t } = useTranslation()
  const { data }: UseQueryResult<WithdrawalResponse[]> = useWithdrawalsList()
  const [pageSize, setPageSize] = useState(5)

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 180,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('withdrawals:status'),
      ...commonProps,
    },
    {
      field: 'currency',
      headerName: t('withdrawals:currency'),
      ...commonProps,
    },
    {
      field: 'amount',
      headerName: t('withdrawals:amount'),
      align: 'right',
      ...commonProps,
    },
    {
      field: 'reason',
      headerName: t('withdrawals:reason'),
      ...commonProps,
    },
    {
      field: 'approvedBy',
      headerName: t('withdrawals:approvedBy'),
      ...commonProps,
      valueGetter: (c) => {
        return c.row.approvedBy.firstName + ' ' + c.row.approvedBy.lastName
      },
    },
    {
      field: 'bankAccount',
      headerName: t('withdrawals:bankAccount'),
      ...commonProps,
      valueGetter: (c) => {
        return c.row.bankAccount.accountHolderName
      },
    },
    {
      field: 'sourceCampaign',
      headerName: t('withdrawals:sourceCampaign'),
      ...commonProps,
      valueGetter: (c) => {
        return c.row.sourceCampaign.state
      },
    },
    {
      field: 'sourceVault',
      headerName: t('withdrawals:sourceVault'),
      ...commonProps,
      valueGetter: (c) => {
        return c.row.sourceVault.name
      },
    },
    {
      field: 'createdAt',
      headerName: t('withdrawals:createdAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'targetDate',
      headerName: t('withdrawals:targetDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'updatedAt',
      headerName: t('withdrawals:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'actions',
      headerName: t('withdrawals:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.withdrawals.edit(params.row.id)}
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
          disableSelectionOnClick
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
    </>
  )
}
