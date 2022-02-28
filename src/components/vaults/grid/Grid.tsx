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

import { VaultResponse } from 'gql/vault'
import { useVaultsList } from 'common/hooks/vaults'
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

  const { data }: UseQueryResult<VaultResponse[]> = useVaultsList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: t('vaults:name'),
      ...commonProps,
    },
    {
      field: 'currency',
      headerName: t('vaults:currency'),
      ...commonProps,
    },
    {
      field: 'amount',
      headerName: t('vaults:amount'),
      ...commonProps,
    },
    {
      field: 'createdAt',
      headerName: t('vaults:createdAt'),
      ...commonProps,
    },
    {
      field: 'updatedAt',
      headerName: t('vaults:updatedAt'),
      ...commonProps,
    },
    {
      field: 'campaignId',
      headerName: t('vaults:campaignId'),
      ...commonProps,
      width: 450,
    },
    {
      field: t('vaults:actions'),
      width: 200,
      align: 'right',
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
