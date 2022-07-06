import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { useVault } from 'common/hooks/vaults'
import { useCampaignDonationsList, useDonationsList } from 'common/hooks/donation'
import { useViewPerson } from 'service/person'
import { DonationResponse } from 'gql/donations'
import GridActions from 'components/admin/GridActions'

import DetailsModal from '../modals/DetailsModal'
import DeleteModal from '../modals/DeleteModal'
import { ModalStore } from '../DonationsPage'
import { getExactDate } from 'common/util/date'
import { useRouter } from 'next/router'
import { money } from 'common/util/money'

interface RenderCellProps {
  params: GridRenderCellParams
}

export default observer(function Grid() {
  const [pageSize, setPageSize] = useState(5)
  const { t } = useTranslation()
  const router = useRouter()
  const { isDetailsOpen } = ModalStore
  const campaignId = router.query.campaignId
  const { data }: UseQueryResult<DonationResponse[]> = campaignId
    ? useCampaignDonationsList(campaignId as string)
    : useDonationsList()

  const RenderVaultCell = ({ params }: RenderCellProps) => {
    const vault = useVault(params.row.targetVaultId)
    return <>{vault.data?.name}</>
  }

  const RenderPersonCell = ({ params }: RenderCellProps) => {
    const person = useViewPerson(params.row.personId)
    return <>{person.data?.firstName + ' ' + person.data?.lastName}</>
  }

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
    },
    {
      field: 'provider',
      headerName: t('donations:provider'),
      ...commonProps,
      width: 250,
    },
    {
      field: 'targetVaultId',
      headerName: t('donations:vault'),
      ...commonProps,
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderVaultCell params={params} />
      },
    },
    {
      field: 'person',
      headerName: t('donations:person'),
      ...commonProps,
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderPersonCell params={params} />
      },
    },
    {
      field: 'amount',
      headerName: t('donations:amount'),
      renderCell: (params: GridRenderCellParams) => {
        return <RenderMoneyCell params={params} />
      },
    },
    {
      field: 'currency',
      headerName: t('donations:currency'),
      ...commonProps,
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: t('donations:date'),
      ...commonProps,
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        return getExactDate(params?.row.createdAt)
      },
    },
    {
      field: 'actions',
      headerName: t('donations:actions'),
      width: 200,
      align: 'right',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            modalStore={ModalStore}
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

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
