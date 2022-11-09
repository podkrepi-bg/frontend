import React, { useState } from 'react'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'
import { RecurringDonationResponse } from 'gql/recurring-donation'
import { useRecurringDonationList } from 'common/hooks/recurringDonation'
import GridActions from 'components/admin/GridActions'

import DeleteModal from '../DeleteModal'
import DetailsModal from '../DetailsModal'

function prettyRows(rows: RecurringDonationResponse[]) {
  const { t } = useTranslation('recurring-donation')

  return rows.map((row) => ({
    ...row,
    campaignTitle: row.sourceVault.campaign.title,
    personName: row.person?.firstName + ' ' + row.person?.lastName,
    amount: row.amount / 100 + ' ' + row.currency,
    currency: row.currency.toUpperCase(),
    status: t('statuses.' + row.status),
  }))
}

export default function Grid() {
  const { t } = useTranslation('recurring-donation')
  let { data }: UseQueryResult<RecurringDonationResponse[]> = useRecurringDonationList()
  const [pageSize, setPageSize] = useState(5)

  if (data) {
    data = prettyRows(data)
  }

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 150,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'status',
      headerName: t('recurring-donation:status'),
      flex: 1.5,
      ...commonProps,
    },
    {
      field: 'amount',
      headerName: t('amount'),
      flex: 1.5,
      ...commonProps,
    },

    {
      field: 'personName',
      headerName: t('person'),
      ...commonProps,
      width: 300,
    },
    {
      field: 'campaignTitle',
      headerName: t('campaign'),
      ...commonProps,
      width: 300,
    },
    {
      field: 'actions',
      headerName: t('actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <GridActions
            modalStore={ModalStore}
            id={params.row.id}
            name={params.row.name}
            editLink={routes.admin.recurringDonation.view(params.row.id)}
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
          disableSelectionOnClick
        />
      </Box>
      <DetailsModal />
      <DeleteModal />
    </>
  )
}
