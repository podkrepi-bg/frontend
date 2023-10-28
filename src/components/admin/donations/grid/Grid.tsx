import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useDonationsList } from 'common/hooks/donation'

import DetailsModal from '../modals/DetailsModal'
import DeleteModal from '../modals/DeleteModal'
import { ModalStore, RefundStore } from '../DonationsPage'
import { getExactDateTime } from 'common/util/date'
import { useRouter } from 'next/router'
import { money } from 'common/util/money'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { usePersonList } from 'common/hooks/person'
import theme from 'common/theme'
import RenderEditPersonCell from './RenderEditPersonCell'
import { useStores } from '../../../../common/hooks/useStores'
import RenderEditBillingEmailCell from './RenderEditBillingEmailCell'
import RestoreIcon from '@mui/icons-material/Restore'
import RefundModal from '../modals/RefundModal'

interface RenderCellProps {
  params: GridRenderCellParams
}
const addIconStyles = {
  background: theme.palette.primary.light,
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.7,
  boxShadow: 3,
}
export default observer(function Grid() {
  const { donationStore } = useStores()

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [focusedRowId, setFocusedRowId] = useState(null as string | null)
  const { t } = useTranslation()
  const router = useRouter()
  const { isDetailsOpen } = ModalStore
  const { isRefundOpen } = RefundStore
  const campaignId = router.query.campaignId as string | undefined

  const {
    data: { items: donations, total: allDonationsCount } = { items: [], total: 0 },
    // error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
    refetch,
  }: UseQueryResult<CampaignDonationHistoryResponse> = useDonationsList(
    campaignId,
    { pageIndex: paginationModel.page, pageSize: paginationModel.pageSize },
    donationStore.donationFilters,
    donationStore.donationSearch ?? '',
  )

  const { data: { items: personList } = { items: [] } } = usePersonList()

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
                    params.api.startCellEditMode({ id: params.row.id, field: params.field })
                  }
                  params.api.getCellMode(params.row.id, params.field)
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

  const RenderBillingEmaiCell = ({ params }: RenderCellProps) => {
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {params.row.billingEmail}
          {params.isEditable ? (
            <Tooltip title={t('donations:cta.edit')}>
              <Edit
                sx={addIconStyles}
                color="action"
                fontSize="medium"
                onClick={() => {
                  if (focusedRowId) {
                    params.api.startCellEditMode({ id: params.row.id, field: params.field })
                  }
                  params.api.getCellMode(params.row.id, params.field)
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

  const { showRefund, setSelectedRecord } = RefundStore

  function refundClickClickHandler(id: string) {
    setSelectedRecord({ id })
    showRefund()
  }

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 120,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        return params.row?.status === 'succeeded' ? (
          <>
            <Tooltip title={t('donations:refund.icon')}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => refundClickClickHandler(params.row.id)}>
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          ''
        )
      },
    },
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
        return <RenderEditPersonCell params={params} personList={personList} onUpdate={refetch} />
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
      width: 300,
      editable: true,
      renderCell: (params: GridRenderCellParams) => {
        return <RenderBillingEmaiCell params={params} />
      },

      renderEditCell: (params: GridRenderEditCellParams) => {
        return (
          <RenderEditBillingEmailCell params={params} personList={personList} onUpdate={refetch} />
        )
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 320,
    },
    {
      field: 'type',
      headerName: t('donations:type'),
    },
    {
      field: 'provider',
      headerName: t('donations:provider'),
      ...commonProps,
      width: 100,
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
            background: theme.palette.common.white,
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
          columnVisibilityModel={{
            id: false,
          }}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pagination
          loading={isDonationHistoryLoading}
          paginationMode="server"
          rowCount={allDonationsCount}
          disableRowSelectionOnClick
          isCellEditable={() => true}
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      {isRefundOpen && <RefundModal />}
      <DeleteModal />
    </>
  )
})
