import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { BenefactorResponse } from 'gql/benefactor'
import GridActions from 'components/admin/GridActions'
import { useBenefactorList } from 'common/hooks/benefactor'

import DeleteModal from './DeleteModal'
import DetailsModal from './DetailsModal'

export default function Grid() {
  const { t } = useTranslation('benefactor')
  const [pageSize, setPageSize] = useState(5)
  const { data }: UseQueryResult<BenefactorResponse[]> = useBenefactorList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'extCustomerId',
      headerName: t('extCustomerId'),
      valueGetter: (p) => p.row.extCustomerId,
      ...commonProps,
      flex: 1,
    },
    {
      field: 'personId',
      headerName: t('personId'),
      valueGetter: (p) => p.row.personId,
      ...commonProps,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: t('actions'),
      headerAlign: 'left',
      type: 'actions',
      width: 120,
      resizable: false,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            id={params.row.id}
            name={params.row.person}
            editLink={routes.admin.benefactor.view(params.row.id)}
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
          autoHeight
          autoPageSize
          disableSelectionOnClick
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
    </>
  )
}
