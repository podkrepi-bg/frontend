import { useTranslation } from 'next-i18next'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Tooltip, Button, Box } from '@mui/material'

import { getExactDateTime, getRelativeDate } from 'common/util/date'
import { money } from 'common/util/money'
import { useUserDonationsCampaigns } from 'common/hooks/campaigns'
import Link from 'components/common/Link'
import {
  DisplayBeneficiary,
  DisplayCoordinator,
  DisplayOrganizer,
  DisplayReachedAmount,
} from 'components/admin/campaigns/grid/CampaignGrid'

export default function MyDonatedToCampaignTable() {
  const { t, i18n } = useTranslation()
  const { data = [] } = useUserDonationsCampaigns()
  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColumns = [
    {
      field: 'state',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      width: 130,
    },
    {
      field: 'title',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 380,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/campaigns/${cellValues.row.slug}`}>{cellValues.row.title}</Link>
      ),
    },
    {
      field: 'essence',
      headerName: t('campaigns:essence'),
      ...commonProps,
      align: 'left',
      width: 380,
    },
    {
      field: 'coordinator',
      headerName: t('campaigns:coordinator'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayCoordinator params={params} />
      },
      align: 'left',
      width: 230,
    },
    {
      field: 'organizer',
      headerName: t('campaigns:organizer'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayOrganizer params={params} />
      },
      align: 'left',
      width: 230,
    },
    {
      field: 'beneficiary',
      headerName: t('campaigns:beneficiary'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayBeneficiary params={params} />
      },
      align: 'left',
      width: 230,
    },
    {
      field: 'campaignType',
      headerName: t('campaigns:campaignType'),
      ...commonProps,
      align: 'left',
      width: 280,
      renderCell: (cellValues: GridRenderCellParams) => <>{cellValues.row.campaignType.name}</>,
    },
    {
      field: 'reachedAmount',
      headerName: t('campaigns:donationsAmount'),
      ...commonProps,
      align: 'right',
      width: 250,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/admin/donations?campaignId=${cellValues.row.id}`}>
          <DisplayReachedAmount params={cellValues} />
        </Link>
      ),
    },
    {
      field: 'targetAmount',
      headerName: t('campaigns:targetAmount'),
      ...commonProps,
      align: 'right',
      width: 180,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{money(cellValues.row.targetAmount, cellValues.row.currency)}</>
      ),
    },
    {
      field: 'currency',
      headerName: t('campaigns:currency'),
      ...commonProps,
      align: 'left',
    },
    {
      field: 'startDate',
      headerName: t('campaigns:startDate'),
      align: 'left',
      width: 270,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <Tooltip title={getExactDateTime(cellValues.row.startDate)}>
          <Button color="inherit">
            {getRelativeDate(cellValues.row.startDate, i18n.language)}
          </Button>
        </Tooltip>
      ),
    },
    {
      field: 'endDate',
      headerName: t('campaigns:endDate'),
      align: 'left',
      width: 270,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <Tooltip title={getExactDateTime(cellValues.row.endDate)}>
          <Button color="inherit">{getRelativeDate(cellValues.row.endDate, i18n.language)}</Button>
        </Tooltip>
      ),
    },
    {
      field: 'createdAt',
      headerName: t('campaigns:createDate'),
      align: 'left',
      width: 270,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <Tooltip title={getExactDateTime(cellValues.row.createdAt)}>
          <Button color="inherit">
            {getRelativeDate(cellValues.row.createdAt, i18n.language)}
          </Button>
        </Tooltip>
      ),
    },
    {
      field: 'updatedAt',
      headerName: t('campaigns:updatedAt'),
      align: 'left',
      width: 270,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <Tooltip title={getExactDateTime(cellValues.row.updatedAt)}>
          <Button color="inherit">
            {getRelativeDate(cellValues.row.updatedAt, i18n.language)}
          </Button>
        </Tooltip>
      ),
    },
    {
      field: 'deletedAt',
      headerName: t('campaigns:deletedAt'),
      align: 'left',
      width: 270,
      headerAlign: 'left',
    },
  ]
  return (
    <>
      {data.length !== 0 ? (
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
          rows={data || []}
          columns={columns}
          pageSize={5}
          editMode="row"
          autoHeight
          autoPageSize
        />
      ) : (
        <Box sx={{ fontSize: 20 }}>{t('profile:donations.noDonations')}</Box>
      )}
    </>
  )
}
