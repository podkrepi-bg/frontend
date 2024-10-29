import React, { useState } from 'react'
import { UseQueryResult, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Box, IconButton, Tooltip } from '@mui/material'

import { Autorenew, Edit } from '@mui/icons-material'
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRenderEditCellParams,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'

import { useDonationsList } from 'common/hooks/donation'

import { getExactDateTime } from 'common/util/date'
import { useRouter } from 'next/router'
import { money } from 'common/util/money'
import { CampaignDonationHistoryResponse } from 'gql/campaigns'
import { usePersonList } from 'common/hooks/person'
import theme from 'common/theme'
import RenderEditPersonCell from './RenderEditPersonCell'
import { useStores } from '../../../../common/hooks/useStores'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { endpoints } from 'service/apiEndpoints'
import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'

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
  const queryClient = useQueryClient()

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  const [focusedRowId, setFocusedRowId] = useState(null as string | null)
  const { t } = useTranslation()
  const router = useRouter()

  const campaignId = router.query.campaignId as string | undefined
  const paymentId = router.query.paymentId as string | undefined

  const syncMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiClient.patch(
        endpoints.donation.synchronizeWithPayment(id).url,
        null,
        authConfig(session?.accessToken),
      )
    },
    onError: () => {
      AlertStore.show(t('common:alerts.error'), 'error')
      queryClient.invalidateQueries([
        endpoints.donation.donationsList(
          paymentId,
          campaignId,
          { pageIndex: paginationModel.page, pageSize: paginationModel.pageSize },
          donationStore.donationFilters,
          donationStore.donationSearch ?? '',
        ).url,
      ])
    },
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries([
        endpoints.donation.donationsList(
          paymentId,
          campaignId,
          { pageIndex: paginationModel.page, pageSize: paginationModel.pageSize },
          donationStore.donationFilters,
          donationStore.donationSearch ?? '',
        ).url,
      ])
    },
  })
  const { data: session } = useSession()

  const canEditFinancials = session?.user?.realm_access?.roles.includes(
    'account-edit-financials-requests',
  )

  const {
    data: { items: donations, total: allDonationsCount } = { items: [], total: 0 },
    isLoading: isDonationHistoryLoading,
    refetch,
  }: UseQueryResult<CampaignDonationHistoryResponse> = useDonationsList(
    paymentId,
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

  const RenderMoneyCell = ({ params }: RenderCellProps) => {
    return <>{money(params.row.amount, params.row.currency)}</>
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 120,
      resizable: false,
      renderCell: (params: GridRenderCellParams) => {
        if (!canEditFinancials) {
          return ''
        }

        return (
          <>
            <Tooltip title={t('Синхронизиране на дарение с плащане')}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => syncMutation.mutate(params.row.id)}>
                <Autorenew color="primary" />
              </IconButton>
            </Tooltip>
          </>
        )
      },
    },
    {
      field: 'paymentId',
      headerName: 'Плащане номер',
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Link href={`/admin/payments?id=${params.row.paymentId}`}>{params.row.paymentId}</Link>
        )
      },
    },
    {
      field: 'payment.status',
      headerName: 'Статус на плащане',
      renderCell(params) {
        return params.row.payment?.status
      },
    },
    {
      field: 'payment.provider',
      headerName: 'Разплащателна система',
      renderCell(params) {
        return params.row.payment?.provider
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
      field: 'payment.billingName',
      headerName: 'billingName',
      width: 250,
      renderCell(params) {
        return params.row.payment?.billingName
      },
    },
    {
      field: 'payment.billingEmail',
      headerName: 'billingEmail',
      width: 300,
      renderCell(params) {
        return params.row.payment?.billingEmail
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
      field: 'currency',
      headerName: t('donations:currency'),
      ...commonProps,
      width: 100,
      renderCell(params) {
        return params.row.payment?.currency
      },
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
      field: 'id',
      headerName: 'ID',
      width: 320,
    },
    {
      field: 'type',
      headerName: t('donations:type'),
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
    </>
  )
})
