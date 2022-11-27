import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { WithdrawalResponse } from 'gql/withdrawals'
import GridActions from 'components/admin/GridActions'
import { useWithdrawalsList } from 'common/hooks/withdrawals'

import { ModalStore } from '../WithdrawalPage'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import { fromMoney } from 'common/util/money'

export default observer(function Grid() {
  const { t } = useTranslation()
  const { data }: UseQueryResult<WithdrawalResponse[]> = useWithdrawalsList()
  const { isDetailsOpen } = ModalStore
  const [pageSize, setPageSize] = useState(5)

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 180,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'actions',
      headerName: t('withdrawals:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.id}
            editLink={routes.admin.withdrawals.edit(params.row.id)}
          />
        )
      },
    },
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
      valueGetter: (c) => {
        return fromMoney(c.row.amount)
      },
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
        return c.row.sourceCampaign.title
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

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
