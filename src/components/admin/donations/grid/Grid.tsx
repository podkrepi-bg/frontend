import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridCellModes,
  GridColDef,
  GridColumns,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useDonationsList } from 'common/hooks/donation'

import DetailsModal from '../modals/DetailsModal'
import DeleteModal from '../modals/DeleteModal'
import { ModalStore } from '../DonationsPage'
import { getExactDateTime } from 'common/util/date'
import { useRouter } from 'next/router'
import { money } from 'common/util/money'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { PersonResponse } from 'gql/person'
import { usePersonList } from 'common/hooks/person'
import RenderEditPersonCell from './RenderEditPersonCell'
import { useStores } from '../../../../common/hooks/useStores'

interface RenderCellProps {
  params: GridRenderCellParams
}
const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}
export default observer(function Grid() {
  const { donationStore } = useStores()
  const [paginationData, setPaginationData] = useState({
    pageIndex: 0,
    pageSize: 20,
  })
  const [focusedRowId, setFocusedRowId] = useState(null as string | null)
  const { t } = useTranslation()
  const router = useRouter()
  const { isDetailsOpen } = ModalStore
  const campaignId = router.query.campaignId as string | undefined

  const {
    data: { items: donations, total: all_rows } = { items: [], total: 0 },
    error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
    refetch,
  }: UseQueryResult<CampaignDonationHistoryResponse> = useDonationsList(
    campaignId,
    paginationData,
    donationStore.donationFilters,
    donationStore.donationSearch,
  )

  const { data }: UseQueryResult<PersonResponse[]> = usePersonList()

  const RenderVaultCell = ({ params }: RenderCellProps) => {
    return <>{params.row.targetVault.name}</>
  }

  const RenderPersonCell = ({ params }: RenderCellProps) => {
    const { firstName, lastName } = params.row.person
      ? params.row.person
      : { firstName: 'Anonymous', lastName: 'Donor' }
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {firstName + ' ' + lastName}
          {params.isEditable ? (
            <Tooltip title={t('donations:cta.edit')}>
              <Edit
                sx={addIconStyles}
                color="action"
                fontSize="medium"
                onClick={() => {
                  if (focusedRowId) {
                    params.api.setCellMode(focusedRowId, params.field, GridCellModes.View)
                  }
                  params.api.setCellMode(params.row.id, params.field, GridCellModes.Edit)
                  setFocusedRowId(params.row.id)
                }}
              />
            </Tooltip>
          ) : (
            <></>
          )}
        </Box>
      </>
    )
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
      field: 'createdAt',
      headerName: t('donations:date'),
      ...commonProps,
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        return getExactDateTime(params?.row.createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('donations:status'),
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
      field: 'person',
      headerName: t('donations:person'),
      ...commonProps,
      editable: true,
      width: 280,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderPersonCell params={params} />
      },
      renderEditCell: (params: GridRenderEditCellParams) => {
        return <RenderEditPersonCell params={params} personList={data} onUpdate={refetch} />
      },
    },
    {
      field: 'billingName',
      headerName: 'Billing Name',
      width: 250,
    },
    {
      field: 'billingEmail',
      headerName: 'Billing Email',
      width: 250,
    },
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
  ]

  return (
    <>
      <Box sx={{ mx: 'auto', width: 700 }}>
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
          rows={donations || []}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          pageSize={paginationData.pageSize}
          pagination
          loading={isDonationHistoryLoading}
          error={donationHistoryError}
          page={paginationData.pageIndex}
          onPageChange={(pageIndex) => setPaginationData({ ...paginationData, pageIndex })}
          onPageSizeChange={(pageSize) => setPaginationData({ ...paginationData, pageSize })}
          paginationMode="server"
          rowCount={all_rows}
          disableSelectionOnClick
          isCellEditable={() => true}
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      <DeleteModal />
    </>
  )
})
