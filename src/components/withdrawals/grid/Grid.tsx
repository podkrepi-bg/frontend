import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { Box } from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'

import { WithdrawalResponse } from 'gql/withdrawals'
import { useWithdrawalsList } from 'common/hooks/withdrawals'
import { ModalStore } from 'stores/documents/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from './GridActions'

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const { selectedPositive, selectedNegative } = ModalStore

  const { data }: UseQueryResult<WithdrawalResponse[]> = useWithdrawalsList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 180,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('withdrawals:name'),
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
      ...commonProps,
    },
    {
      field: 'reason',
      headerName: t('withdrawals:reason'),
      ...commonProps,
    },
    {
      field: 'createdAt',
      headerName: t('Withdrawals:createdAt'),
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
      headerName: t('Withdrawals:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'approvedBy',
      headerName: t('withdrawals:approvedBy'),
      ...commonProps,
    },
    {
      field: 'bankAccount',
      headerName: t('withdrawals:bankAccount'),
      ...commonProps,
    },
    {
      field: 'sourceCampaign',
      headerName: t('withdrawals:sourceCampaign'),
      ...commonProps,
    },
    {
      field: 'sourceVault',
      headerName: t('withdrawals:sourceVault'),
      ...commonProps,
    },
    {
      field: t('withdrawals:actions'),
      width: 200,
      align: 'right',
      renderCell: (cellValues: GridRenderCellParams) => {
        return <GridActions id={cellValues.row.id} setSelectedId={setSelectedId} />
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
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            newSelectionModel.length !== 0 ? selectedPositive() : selectedNegative()
            setSelectionModel(newSelectionModel)
          }}
        />
      </Box>
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} setSelectedId={setSelectedId} />
      <DeleteAllModal selectionModel={selectionModel} />
    </>
  )
})
