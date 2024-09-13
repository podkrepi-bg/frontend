import { useTranslation } from 'next-i18next'

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { routes } from 'common/routes'
import theme from 'common/theme'
import { CampaignApplicationAdminResponse } from 'gql/campaign-applications'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { endpoints } from 'service/apiEndpoints'
import { authQueryFnFactory } from 'service/restRequests'

export default function CampaignApplicationsGrid() {
  const { t } = useTranslation('campaign-application')
  const { list } = useCampaignsList()

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColDef[] = [
    {
      field: 'state',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      width: 220,
      renderCell: (cellValues: GridRenderCellParams) => t(`status.${cellValues.row.state}`),
    },
    {
      field: 'campaignName',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 250,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={routes.admin.campaignApplications.edit(cellValues.id.toString())}>
          {cellValues.row.campaignName}
        </Link>
      ),
    },
    {
      field: 'goal',
      headerName: t('campaigns:essence'),
      ...commonProps,
      align: 'left',
      width: 250,
    },
    {
      field: 'organizerName',
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

  return (
    <DataGrid
      style={{
        background: theme.palette.common.white,
        position: 'absolute',
        height: 'calc(100vh - 299px)',
        border: 'none',
        width: 'calc(100% - 48px)',
        left: '24px',
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '0 0 13px 13px',
      }}
      rows={list || []}
      columns={columns}
      editMode="row"
      pageSizeOptions={[20, 50, 100]}
    />
  )
}

function fetchMutation() {
  const { data } = useSession()
  return useQuery(
    [endpoints.campaignApplication.listAllForAdmin.url],
    authQueryFnFactory<CampaignApplicationAdminResponse[]>(data?.accessToken),
    {
      cacheTime: 10 * 60 * 1000,
      staleTime: 10 * 60 * 1000,
    },
  )
}

export const useCampaignsList = () => {
  const { data, isLoading } = fetchMutation()

  return {
    list: data?.toSorted((a, b) => b?.updatedAt?.localeCompare(a?.updatedAt ?? '') ?? 0),
    isLoading,
  }
}
