import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { VaultResponse } from 'gql/vault'
import { useVaultsList } from 'common/hooks/vaults'
import GridActions from 'components/admin/GridActions'

import { ModalStore } from '../VaultsPage'
import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'
import { money } from 'common/util/money'

export default observer(function Grid() {
  const { t } = useTranslation('vaults')
  const { data }: UseQueryResult<VaultResponse[]> = useVaultsList()
  const { isDetailsOpen } = ModalStore
  const [pageSize, setPageSize] = useState(5)

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.name}
            editLink={routes.admin.vaults.edit(params.row.id)}
          />
        )
      },
    },
    {
      field: 'name',
      headerName: t('name'),
      ...commonProps,
      width: 200,
    },
    {
      field: 'currency',
      headerName: t('currency'),
      ...commonProps,
      width: 80,
    },
    {
      field: 'amount',
      headerName: t('reachedАmount'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => (
        <>{money(params.row.amount, params.row.currency)}</>
      ),
    },
    {
      field: 'blockedAmount',
      headerName: t('blockedAmount'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => (
        <>{money(params.row.blockedAmount, params.row.currency)}</>
      ),
    },
    {
      field: 'reachedAmound',
      headerName: t('amount'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => (
        <>{money(params.row.amount - params.row.blockedAmount, params.row.currency)}</>
      ),
    },
    {
      field: 'createdAt',
      headerName: t('createdAt'),
      ...commonProps,
    },
    {
      field: 'updatedAt',
      headerName: t('updatedAt'),
      ...commonProps,
    },
    {
      field: 'campaignId',
      headerName: t('campaignId'),
      ...commonProps,
      width: 450,
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
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
