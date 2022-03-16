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
import { CampaignTypesResponse } from 'gql/campaign-types'
import { useCampaignTypesList } from 'service/campaignTypes'
import { ModalStore } from 'stores/dashboard/ModalStore'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import GridActions from 'components/admin/GridActions'

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation('campaign-types')
  const { setSelectedIdsToDelete } = ModalStore

  setSelectedIdsToDelete([])

  const { data }: UseQueryResult<CampaignTypesResponse[]> = useCampaignTypesList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 250,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: t('grid.name'),
      flex: 1,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => {
        return cellValues.row.name
      },
    },
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      sortable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.id}
            name={params.row.ibanNumber}
            editLink={routes.admin.campaignTypes.edit(params.row.id)}
          />
        )
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
            setSelectedIdsToDelete(newSelectionModel.map((item) => item.toString()))
          }}
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
      <DeleteAllModal />
    </>
  )
})
