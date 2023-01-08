import React, { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { IconButton, Tooltip, Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { RecurringDonationResponse } from 'gql/recurring-donation'
import { useAllRecurringDonations } from 'common/hooks/recurringDonation'
import { money } from 'common/util/money'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { endpoints } from 'service/apiEndpoints'
import { useSession } from 'next-auth/react'
import { AlertStore } from 'stores/AlertStore'

import DeleteModal from '../DeleteModal'
import DetailsModal from '../DetailsModal'
import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import EditIcon from '@mui/icons-material/Edit'
import { routes } from 'common/routes'

export default function Grid() {
  const { t } = useTranslation('recurring-donation')
  const { data }: UseQueryResult<RecurringDonationResponse[]> = useAllRecurringDonations()
  const [pageSize, setPageSize] = useState(5)
  const { data: session } = useSession()
  const router = useRouter()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      apiClient.get(
        endpoints.recurringDonation.cancelRecurringDonation(id).url,
        authConfig(session?.accessToken),
      )
    },
    onError: (err) => AlertStore.show(t('common:alerts.error') + err, 'error'),
    onSuccess: () => {
      AlertStore.show(t('recurring-donation:alerts.cancel'), 'success')
    },
  })

  const cancelRecurringDonation = (id: string) => {
    if (confirm(t('recurring-donation:alerts.cancel-confirm'))) {
      cancelMutation.mutate(id)
    }
  }

  const editRecurringDonation = (id: string) => {
    //open the edit page
    router.push(routes.admin.recurringDonation.edit(id))
  }

  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('recurring-donation:status'),
      flex: 1.5,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{t('statuses.' + cellValues.row.status)}</>
      ),
    },
    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1.5,
      ...commonProps,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{money(cellValues.row.amount, cellValues.row.currency)}</>
      ),
    },

    {
      field: 'personName',
      headerName: t('person'),
      ...commonProps,
      width: 300,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{cellValues.row.person?.firstName + ' ' + cellValues.row.person?.lastName}</>
      ),
    },
    {
      field: 'campaignTitle',
      headerName: t('campaign'),
      ...commonProps,
      width: 300,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{cellValues.row.sourceVault.campaign.title}</>
      ),
    },
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'center',
      renderCell: (cellValues: GridRenderCellParams): React.ReactNode => {
        return (
          <div>
            <Tooltip title={t('recurring-donation:cta.edit') || ''}>
              <IconButton
                size="small"
                color="primary"
                onClick={async () => editRecurringDonation(cellValues.row.id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('recurring-donation:cta.cancel') || ''}>
              <IconButton
                size="small"
                color="primary"
                onClick={async () => cancelRecurringDonation(cellValues.row.id)}>
                <CancelPresentationIcon />
              </IconButton>
            </Tooltip>
          </div>
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
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
    </>
  )
}
