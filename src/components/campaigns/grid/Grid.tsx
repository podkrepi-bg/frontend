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
  GridSelectionModel,
} from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { CampaignResponse } from 'gql/campaigns'
import { useCampaignList } from 'common/hooks/campaigns'
import { ModalStore } from 'stores/dashboard/ModalStore'
import GridActions from 'components/admin/GridActions'

// import DetailsModal from './modals/DetailsModal'
import DeleteModal from './modals/DeleteModal'
import DeleteAllModal from './modals/DeleteAllModal'

export default observer(function Grid() {
  const { t } = useTranslation()
  const { data }: UseQueryResult<CampaignResponse[]> = useCampaignList()
  const [pageSize, setPageSize] = useState(5)

  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 180,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('campaigns:status'),
      ...commonProps,
    },
    {
      field: 'title',
      headerName: t('campaigns:title'),
      ...commonProps,
    },
    {
      field: 'essence',
      headerName: t('campaigns:essence'),
      align: 'right',
      ...commonProps,
    },
    {
      field: 'coordinator',
      headerName: t('campaigns:coordinator'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.bankAccount.accountHolderName
      // },
    },
    {
      field: 'beneficiary',
      headerName: t('campaigns:beneficiary'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.bankAccount.accountHolderName
      // },
    },
    {
      field: 'approvedBy',
      headerName: t('campaigns:approvedBy'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.approvedBy.firstName + ' ' + c.row.approvedBy.lastName
      // },
    },
    {
      field: 'campaignTye',
      headerName: t('campaigns:campaignTye'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.bankAccount.accountHolderName
      // },
    },
    {
      field: 'description',
      headerName: t('campaigns:description'),
      align: 'right',
      ...commonProps,
    },
    {
      field: 'targetAmount',
      headerName: t('campaigns:targetAmount'),
      align: 'right',
      ...commonProps,
    },
    {
      field: 'currency',
      headerName: t('campaigns:currency'),
      ...commonProps,
    },
    {
      field: 'vaults',
      headerName: t('campaigns:vaults'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.bankAccount.accountHolderName
      // },
    },
    {
      field: 'withdrawals',
      headerName: t('campaigns:withdrawals'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.sourceCampaign.state
      // },
    },
    {
      field: 'outgoingTransfers',
      headerName: t('campaigns:outgoingTransfers'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.sourceVault.name
      // },
    },
    {
      field: 'incomingTransfers',
      headerName: t('campaigns:incomingTransfers'),
      ...commonProps,
      // valueGetter: (c) => {
      //   return c.row.sourceVault.name
      // },
    },
    {
      field: 'startDate',
      headerName: t('campaigns:startDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'endDate',
      headerName: t('campaigns:endDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'createDate',
      headerName: t('campaigns:createDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'updatedAt',
      headerName: t('campaigns:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'deletedAt',
      headerName: t('campaigns:deletedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'actions',
      headerName: t('campaigns:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.slug}
            name={params.row.slug}
            editLink={routes.admin.campaigns.edit(params.row.slug)}
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
          checkboxSelection
          onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
            setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
          }}
        />
      </Box>

      {/* <DetailsModal /> */}
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
