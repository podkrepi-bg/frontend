import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import { useSession } from 'next-auth/react'

import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { IconButton, Tooltip, Box } from '@mui/material'
import { money } from 'common/util/money'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { useGetUserRecurringDonations } from 'common/hooks/recurringDonation'

import Link from 'components/common/Link'
import axios from 'axios'
import { authConfig } from 'service/restRequests'

export default function MyRecurringCampaignsTable() {
  const { t } = useTranslation()
  const { data: recurringDonations } = useGetUserRecurringDonations()
  const { data: session } = useSession()

  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      //TODO: this '/api/v1' does not look right here
      await axios.get(
        '/api/v1' + endpoints.recurringDonation.cancelRecurringDonation(id).url,
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

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'campaignTitle',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 380,
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
      field: 'currency',
      headerName: t('campaigns:currency'),
      ...commonProps,
      align: 'left',
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
      width: 150,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{new Date(cellValues.row.createdAt).toLocaleDateString()}</>
      ),
    },
    {
      field: 'actions',
      headerName: t('recurring-donation:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'center',
      renderCell: (cellValues: GridRenderCellParams): React.ReactNode => {
        return (
          <Tooltip title={t('recurring-donation:cta.cancel') || ''}>
            <IconButton
              size="small"
              color="primary"
              onClick={async () => cancelRecurringDonation(cellValues.row.id)}>
              <DeleteOutlinedIcon />
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
    </>
  )
}
