import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { usePaymentsList } from 'common/hooks/donation'

import DetailsModal from '../modals/DetailsModal'
import InvalidateModal from '../modals/InvalidateModal'
import { ModalStore, RefundStore, InvalidateStore } from '../PaymentsPage'
import { getExactDateTime } from 'common/util/date'
import { useRouter } from 'next/router'
import { money } from 'common/util/money'
import { usePersonList } from 'common/hooks/person'
import theme from 'common/theme'
import { useStores } from '../../../../common/hooks/useStores'
import RenderEditBillingEmailCell from './RenderEditBillingEmailCell'
import RestoreIcon from '@mui/icons-material/Restore'
import CancelIcon from '@mui/icons-material/Cancel'
import RefundModal from '../modals/RefundModal'
import { PaymentStatus, PaymentProvider } from '../../../../gql/donations.enums'
import { useSession } from 'next-auth/react'
import { PaymentAdminResponse } from 'gql/donations'
import Link from 'next/link'
import CreatePaymentDialog from '../store/CreatePaymentContext'

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
  const { isDetailsOpen, isPaymentImportOpen } = ModalStore
  const { isRefundOpen } = RefundStore
  const {
    isDeleteOpen,
    setSelectedRecord: setInvalidateRecord,
    showDelete: showInvalidate,
  } = InvalidateStore
  const paymentId = router.query.id as string | undefined
  const { data: session } = useSession()
  const canEditFinancials = session?.user?.realm_access?.roles.includes(
    'account-edit-financials-requests',
  )
  const {
    data: { items: payments, total: paymentsCount } = { items: [], total: 0 },
    // error: donationHistoryError,
    isLoading: isDonationHistoryLoading,
    refetch,
  }: UseQueryResult<PaymentAdminResponse> = usePaymentsList(
    paymentId,
    donationStore.getCampaignId ?? '',
    { pageIndex: paginationModel.page, pageSize: paginationModel.pageSize },
    donationStore.donationFilters,
    donationStore.donationSearch ?? '',
  )

  const { data: { items: personList } = { items: [] } } = usePersonList()

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

  function refundClickHandler(id: string) {
    setSelectedRecord({ id })
    showRefund()
  }

  function invalidateClickHandler(id: string) {
    setInvalidateRecord({ id, name: '' })
    showInvalidate()
  }

  const columns: GridColDef<PaymentAdminResponse>[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 120,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        if (!canEditFinancials || params.row?.status !== PaymentStatus.succeeded) {
          return ''
        }

        return (
          <>
            {params.row.provider === PaymentProvider.stripe && (
              <Tooltip title={t('donations:refund.icon')}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => refundClickHandler(params.row.id)}>
                  <RestoreIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t('donations:invalidate.icon')}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => invalidateClickHandler(params.row.id)}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </>
        )
      },
    },
    {
      field: 'type',
      headerName: t('donations:type'),
    },
    {
      field: 'createdAt',
      headerName: t('donations:date'),
      ...commonProps,
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        return getExactDateTime(params?.row.createdAt)
      },
    },
    {
      field: 'status',
      headerName: t('donations:status'),
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 320,
    },
    {
      field: 'provider',
      headerName: t('donations:provider'),
      ...commonProps,
      width: 100,
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
      field: 'donations',
      headerName: t('Дарения\n брой'),
      ...commonProps,
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/donations?paymentId=${params.row.id}`}>
          {params.row._count.donations}
        </Link>
      ),
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
          rows={payments || []}
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
          rowCount={paymentsCount}
          disableRowSelectionOnClick
          isCellEditable={() => true}
        />
      </Box>

      {/* making sure we don't sent requests to the API when not needed */}
      {isDetailsOpen && <DetailsModal />}
      {isRefundOpen && <RefundModal />}
      {isDeleteOpen && <InvalidateModal onUpdate={refetch} />}
      {isPaymentImportOpen && <CreatePaymentDialog />}
    </>
  )
})
