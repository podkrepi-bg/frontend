import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { getExactDateTime } from 'common/util/date'

import { money } from 'common/util/money'

import { useStores } from '../../../../common/hooks/useStores'
import { BankTransactionsHistoryResponse } from 'gql/bank-transactions'
import { useBankTransactionsList } from 'common/hooks/bank-transactions'
import RenderBankDonationStatusCell from './RenderEditBankDonationStatusCell'

interface RenderCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const { bankTransactionsStore } = useStores()
  const [paginationData, setPaginationData] = useState({
    pageIndex: 0,
    pageSize: 20,
  })

  const { t } = useTranslation()

  const {
    data: { items: bankTransactions, total: all_rows } = { items: [], total: 0 },
    error: bankTransactionsHistoryError,
    isLoading: bankDonationsHistoryLoading,
  }: UseQueryResult<BankTransactionsHistoryResponse> = useBankTransactionsList(
    paginationData,
    bankTransactionsStore.bankTransactionsFilter,
    bankTransactionsStore.bankTransactionSearch,
  )

  const RenderMoneyCell = ({ params }: RenderCellProps) => {
    return <>{money(params.row.amount, params.row.currency)}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: t('bank-transactions:id'),
      hide: false,
      width: 150,
    },
    {
      field: 'bankName',
      headerName: t('bank-transactions:bank-name'),
      width: 100,
    },
    {
      field: 'transactionDate',
      headerName: t('bank-transactions:transaction-date'),
      ...commonProps,
      width: 220,
      renderCell: (params: GridRenderCellParams) => {
        return getExactDateTime(params?.row.transactionDate)
      },
    },
    {
      field: 'type',
      headerName: t('bank-transactions:type'),
    },
    {
      field: 'amount',
      headerName: t('bank-transactions:amount'),
      renderCell: (params: GridRenderCellParams) => {
        return <RenderMoneyCell params={params} />
      },
    },
    {
      field: 'currency',
      headerName: t('bank-transactions:currency'),
      ...commonProps,
      width: 100,
    },
    {
      field: 'senderName',
      headerName: 'Sender Name',
      width: 250,
    },
    {
      field: 'senderIban',
      headerName: 'Sender IBAN',
      width: 230,
    },
    {
      field: 'recipientName',
      headerName: 'Recipient Name',
      width: 250,
    },
    {
      field: 'recipientIban',
      headerName: 'Recipient IBAN',
      width: 230,
    },
    {
      field: 'description',
      headerName: t('bank-transactions:description'),
      ...commonProps,
      width: 350,
    },
    {
      field: 'bankDonationStatus',
      headerName: t('bank-transactions:donation-status'),
      width: 210,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderBankDonationStatusCell params={params} />
      },
    },
    {
      field: 'matchedRef',
      headerName: t('bank-transactions:matched-ref'),
      width: 180,
    },
  ]

  return (
    <>
      <Box sx={{ mx: 'auto', width: 700 }}>
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
          rows={bankTransactions || []}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={paginationData.pageSize}
          pagination
          loading={bankDonationsHistoryLoading}
          error={bankTransactionsHistoryError}
          page={paginationData.pageIndex}
          onPageChange={(pageIndex) => setPaginationData({ ...paginationData, pageIndex })}
          onPageSizeChange={(pageSize) => setPaginationData({ ...paginationData, pageSize })}
          paginationMode="server"
          rowCount={all_rows}
          disableSelectionOnClick
          isCellEditable={() => true}
        />
      </Box>
    </>
  )
})
