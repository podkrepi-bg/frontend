import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Tooltip, Box } from '@mui/material'
import { money } from 'common/util/money'

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'

import { useGetUserRecurringDonations } from 'common/hooks/recurringDonation'

import Link from 'components/common/Link'
import { apiClient } from 'service/apiClient'
import { authConfig } from 'service/restRequests'

export default function MyRecurringCampaignsTable() {
  const { t } = useTranslation()
  const { data: recurringDonations } = useGetUserRecurringDonations()
  const { data: session } = useSession()

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRecurringDonation, setSelectedRecurringDonation] = useState<string | null>(null)

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      apiClient.get(
        endpoints.recurringDonation.cancelRecurringDonation(id).url,
        authConfig(session?.accessToken),
      )
    },
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('recurring-donation:alerts.cancel'), 'success')
    },
  })

  const cancelRecurringDonation = (id: string) => {
    cancelMutation.mutate(id)
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    minWidth: 100,
    flex: 1,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'campaignTitle',
      headerName: t('campaigns:sourceCampaign'),
      ...commonProps,
      align: 'left',
      minWidth: 250,
      flex: 5,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/campaigns/${cellValues.row.sourceVault.campaign.slug}`}>
          {cellValues.row.sourceVault.campaign.title}
        </Link>
      ),
    },
    {
      field: 'amount',
      headerName: t('profile:donations.amount'),
      ...commonProps,
      align: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{money(cellValues.row.amount, cellValues.row.currency)}</>
      ),
    },
    {
      field: 'status',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{t(`recurring-donation:statuses.${cellValues.row.status}`)}</>
      ),
    },
    {
      field: 'createdAt',
      headerName: t('recurring-donation:startDate'),
      ...commonProps,
      align: 'left',
      minWidth: 120,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{new Date(cellValues.row.createdAt).toLocaleDateString()}</>
      ),
    },
    {
      field: 'actions',
      headerName: t('recurring-donation:actions'),
      minWidth: 100,
      flex: 0.5,
      type: 'actions',
      headerAlign: 'center',
      renderCell: (cellValues: GridRenderCellParams): React.ReactNode => {
        if (cellValues.row.status !== 'active') {
          return null
        }
        return (
          <Tooltip title={t('recurring-donation:cta.cancel') || ''}>
            <IconButton
              size="small"
              color="primary"
              onClick={async () => {
                setSelectedRecurringDonation(cellValues.row.id)
                setOpenDialog(true)
              }}>
              <CancelPresentationIcon />
            </IconButton>
          </Tooltip>
        )
      },
    },
  ]
  return (
    <>
      {recurringDonations && recurringDonations.length !== 0 ? (
        <DataGrid
          style={{
            background: 'white',
            border: 'none',
            width: 'calc(100% - 48px)',
            left: '24px',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRadius: '0 0 13px 13px',
          }}
          rows={recurringDonations || []}
          columns={columns}
          pageSize={5}
          editMode="row"
          autoHeight
          autoPageSize
        />
      ) : (
        <Box sx={{ fontSize: 20 }}>{t('profile:donations.recurringDonations')}</Box>
      )}
      <ConfirmationDialog
        isOpen={openDialog}
        handleCancel={() => setOpenDialog(false)}
        handleConfirm={() => {
          if (selectedRecurringDonation) {
            cancelRecurringDonation(selectedRecurringDonation)
          }
          setOpenDialog(false)
        }}
        title={t('recurring-donation:deleteTitle')}
        content={t('recurring-donation:alerts.cancel-confirm')}
        confirmButtonLabel={t('recurring-donation:cta.confirm')}
        cancelButtonLabel={t('recurring-donation:cta.cancel')}
      />
    </>
  )
}
