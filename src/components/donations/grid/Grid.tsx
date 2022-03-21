import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { useVault } from 'common/hooks/vaults'
import { useViewPerson } from 'service/person'
import { DonationResponse } from 'gql/donations'
import GridActions from 'components/admin/GridActions'
import { useDonationsList } from 'common/hooks/donation'

import DetailsModal from '../modals/DetailsModal'
import DeleteModal from '../modals/DeleteModal'

interface PersonCellProps {
  params: GridRenderCellParams
}

export default function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()

  const { data }: UseQueryResult<DonationResponse[]> = useDonationsList()

  const RenderVaultCell = ({ params }: PersonCellProps) => {
    const vault = useVault(params.row.targetVaultId)
    return <>{vault.data?.name}</>
  }

  const RenderPersonCell = ({ params }: PersonCellProps) => {
    const person = useViewPerson(params.row.personId)
    return <>{person.data?.firstName + ' ' + person.data?.lastName}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'ID',
      hide: true,
    },
    {
      field: 'type',
      headerName: t('donations:type'),
    },
    {
      field: 'status',
      headerName: t('donations:status'),
      ...commonProps,
    },
    {
      field: 'provider',
      headerName: t('donations:provider'),
      ...commonProps,
    },
    {
      field: 'targetVaultId',
      headerName: t('donations:vault'),
      ...commonProps,
      width: 350,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderVaultCell params={params}></RenderVaultCell>
      },
    },
    {
      field: 'person',
      headerName: t('donations:person'),
      ...commonProps,
      width: 350,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderPersonCell params={params}></RenderPersonCell>
      },
    },
    {
      field: 'amount',
      type: 'number',
      headerName: t('donations:amount'),
    },
    {
      field: 'currency',
      headerName: t('donations:currency'),
      ...commonProps,
    },
    {
      field: 'actions',
      headerName: t('donations:actions'),
      width: 200,
      align: 'right',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            id={cellValues.row.id}
            name={cellValues.row.name}
            editLink={routes.admin.donations.edit(cellValues.row.id)}
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
