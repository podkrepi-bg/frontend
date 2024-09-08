import { useTranslation } from 'next-i18next'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { routes } from 'common/routes'
import theme from 'common/theme'
import Link from 'next/link'

export default function CampaignApplicationsGrid() {
  const { t } = useTranslation()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColDef[] = [
    {
      field: 'status',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      width: 220,
    },
    {
      field: 'title',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 250,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={routes.admin.campaignApplications.edit(cellValues.id.toString())}>
          {cellValues.row.title}
        </Link>
      ),
    },
    {
      field: 'essence',
      headerName: t('campaigns:essence'),
      ...commonProps,
      align: 'left',
      width: 250,
    },
    {
      field: 'organizer',
      headerName: t('campaigns:organizer'),
      ...commonProps,
      align: 'left',
      width: 200,
    },
    {
      field: 'beneficiary',
      headerName: t('campaigns:beneficiary'),
      ...commonProps,
      align: 'left',
      width: 200,
    },
    {
      field: 'createdAt',
      headerName: t('campaigns:createDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
    {
      field: 'updatedAt',
      headerName: t('campaigns:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
    },
  ]

  const data = [
    {
      updatedAt: 'date',
      createdAt: '2024-5-5',
      beneficiary: 'beneficiary',
      organizer: 'organizer',
      essence: 'essence',
      title: 'title',
      id: '1',
      status: 'нова',
    },
    {
      updatedAt: 'yesterday',
      createdAt: '10 days ago',
      beneficiary: 'beneficiary',
      organizer: 'organizer',
      essence: 'essence',
      title: 'title',
      id: '2',
      status: 'очаква документи',
    },
    {
      updatedAt: '',
      createdAt: '',
      beneficiary: 'beneficiary',
      organizer: 'organizer',
      essence: 'essence',
      title: 'title',
      id: '3',
      status: 'очаква решение на комисия',
    },

    {
      updatedAt: '',
      createdAt: '',
      beneficiary: 'beneficiary',
      organizer: 'organizer',
      essence: 'essence',
      title: 'title',
      id: '4',
      status: 'одобрена',
    },
    {
      updatedAt: '',
      createdAt: '',
      beneficiary: 'beneficiary',
      organizer: 'organizer',
      essence: 'essence',
      title: 'title',
      id: '4',
      status: 'отказана',
    },
  ]
  return (
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
      rows={data || []}
      columns={columns}
      editMode="row"
      pageSizeOptions={[20, 50, 100]}
    />
  )
}
