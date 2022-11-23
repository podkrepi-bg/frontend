import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import GridActions from 'components/admin/GridActions'
import { CampaignTypesResponse } from 'gql/campaign-types'
import { useCampaignTypesList } from 'service/campaignTypes'

import { ModalStore } from '../CampaignTypesPage'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(10)
  const { t } = useTranslation()

  const { data }: UseQueryResult<CampaignTypesResponse[]> = useCampaignTypesList()
  const { isDetailsOpen } = ModalStore

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'actions',
      headerName: t('campaign-types:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      sortable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.admin.campaignTypes.edit(params.row.id)}
          />
        )
      },
    },
    {
      field: t('campaign-types:grid.name'),
      flex: 1,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => {
        return cellValues.row.name
      },
    },
    {
      field: t('campaign-types:grid.category'),
      flex: 1,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => {
        return <Typography>{t(`campaigns:filters.${cellValues.row.category}`)}</Typography>
      },
    },
    {
      field: t('campaign-types:grid.description'),
      flex: 1,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => {
        return cellValues.row.description
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
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
