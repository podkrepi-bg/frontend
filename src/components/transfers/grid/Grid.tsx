import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'

import { Box } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams, GridSelectionModel } from '@mui/x-data-grid'

import { useTransferList } from 'common/hooks/transfers'

import { TransferResponse } from 'gql/transfer'
import { ModalStore } from 'stores/dashboard/ModalStore'

import GridActions from './GridActions'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import DeleteAllModal from './DeleteAllModal'

export default observer(function Grid() {
  const { t } = useTranslation()

  const { setSelectedIdsToDelete } = ModalStore

  const { data }: UseQueryResult<TransferResponse[]> = useTransferList()

  const [pageSize, setPageSize] = useState(5)
  const [selectedId, setSelectedId] = useState('')

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'status',
      headerName: t('transfer:status'),
      editable: false,
      width: 100,
    },
    {
      field: 'currency',
      headerName: t('transfer:currency'),
      editable: false,
      width: 100,
    },
    {
      field: 'amount',
      headerName: t('transfer:amount'),
      editable: false,
      width: 100,
    },
    {
      field: 'documentId',
      headerName: t('transfer:documentId'),
      editable: false,
      width: 200,
    },
    {
      field: 'targetDate',
      headerName: t('transfer:targetDate'),
      editable: false,
      width: 100,
      valueGetter: (f) => f.row.targetDate?.toString().slice(0, 10),
    },
    {
      field: 'sourceCampaign',
      headerName: t('transfer:sourceCampaign'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.sourceCampaign.title,
    },
    {
      field: 'sourceVault',
      headerName: t('transfer:sourceVault'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.sourceVault.name,
    },
    {
      field: 'approvedBy',
      headerName: t('transfer:approvedBy'),
      editable: false,
      width: 150,
      valueGetter: (f) =>
        f.row.approvedBy ? `${f.row.approvedBy.firstName} ${f.row.approvedBy.lastName}` : '',
    },
    {
      field: 'reason',
      headerName: t('transfer:reason'),
      editable: false,
      width: 200,
    },
    {
      field: 'targetCampaign',
      headerName: t('transfer:targetCampaign'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.targetCampaign.title,
    },
    {
      field: 'targetVault',
      headerName: t('transfer:targetVault'),
      editable: false,
      width: 200,
      valueGetter: (f) => f.row.targetVault.name,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      align: 'center',
      renderCell: (cellValues: GridRenderCellParams) => {
        return <GridActions id={cellValues.row.id} setSelectedId={setSelectedId} />
      },
    },
  ]

  return (
    <>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
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
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
          }}
        />
      </Box>
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} />
      <DeleteAllModal />
    </>
  )
})
