import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import AddIcon from '@mui/icons-material/Add'
import React, { useMemo, useState } from 'react'
import { Box, Button, Toolbar, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { money } from 'common/util/money'
import { AdminCampaignResponse } from 'gql/campaigns'
import Link from 'components/common/Link'
import { useCampaignAdminList } from 'common/hooks/campaigns'
import { getExactDateTime, getRelativeDate } from 'common/util/date'

import GridActions from './GridActions'
import DeleteModal from './modals/DeleteModal'
import DetailsModal from './modals/DetailsModal'
import { BeneficiaryType } from 'components/admin/beneficiary/BeneficiaryTypes'

interface CampaignCellProps {
  params: GridRenderCellParams<AdminCampaignResponse, AdminCampaignResponse>
}

export const DisplayCoordinator = ({ params }: CampaignCellProps) => {
  return (
    <>
      {params.row.coordinator.person.firstName} {params.row.coordinator.person.lastName}
    </>
  )
}
export const DisplayOrganizer = ({ params }: CampaignCellProps) => {
  return (
    <>
      {params.row.organizer?.person.firstName || ''} {params.row.organizer?.person.lastName || ''}
    </>
  )
}

export const DisplayBeneficiary = ({ params }: CampaignCellProps) => {
  return (
    <>
      {params.row.beneficiary.type === BeneficiaryType.individual
        ? params.row.beneficiary.person?.firstName + ' ' + params.row.beneficiary?.person?.lastName
        : params.row.beneficiary.company?.companyName}
    </>
  )
}

export const DisplayReachedAmount = ({ params }: CampaignCellProps) => {
  return <>{money(params.row.summary.reachedAmount ?? 0, params.row.currency)}</>
}

export const DisplayBlockedAmount = ({ params }: CampaignCellProps) => {
  return <>{money(params.row.summary.blockedAmount ?? 0, params.row.currency)}</>
}

export const DisplayCurrentAmount = ({ params }: CampaignCellProps) => {
  return <>{money(params.row.summary.currentAmount ?? 0, params.row.currency)}</>
}

export const DisplayWithdrawnAmount = ({ params }: CampaignCellProps) => {
  return <>{money(params.row.summary.withdrawnAmount ?? 0, params.row.currency)}</>
}

export default function CampaignGrid() {
  const { t, i18n } = useTranslation()
  const { data = [], refetch }: UseQueryResult<AdminCampaignResponse[]> = useCampaignAdminList()
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const selectedCampaign = useMemo(() => data.find((c) => c.id === viewId), [data, viewId])
  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }
  const columns: GridColumns = [
    {
      field: 'actions',
      headerName: t('campaigns:actions'),
      width: 120,
      type: 'actions',
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <GridActions
            id={cellValues.row.id}
            allowDelete={true}
            onView={() => setViewId(cellValues.row.id)}
            onDelete={() => setDeleteId(cellValues.row.id)}
          />
        )
      },
    },
    {
      field: 'state',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      width: 120,
    },
    {
      field: 'title',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 350,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/campaigns/${cellValues.row.slug}`}>{cellValues.row.title}</Link>
      ),
    },
    {
      field: 'essence',
      headerName: t('campaigns:essence'),
      ...commonProps,
      align: 'left',
      width: 350,
    },
    {
      field: 'coordinator',
      headerName: t('campaigns:coordinator'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayCoordinator params={params} />
      },
      align: 'left',
      width: 200,
    },
    {
      field: 'organizer',
      headerName: t('campaigns:organizer'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayOrganizer params={params} />
      },
      align: 'left',
      width: 200,
    },
    {
      field: 'beneficiary',
      headerName: t('campaigns:beneficiary'),
      ...commonProps,
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayBeneficiary params={params} />
      },
      align: 'left',
      width: 200,
    },
    {
      field: 'campaignType',
      headerName: t('campaigns:campaignType'),
      ...commonProps,
      align: 'left',
      width: 250,
      renderCell: (cellValues: GridRenderCellParams) => <>{cellValues.row.campaignType.name}</>,
    },
    {
      field: 'targetAmount',
      headerName: t('campaigns:targetAmount'),
      ...commonProps,
      align: 'right',
      width: 150,
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{money(cellValues.row.targetAmount, cellValues.row.currency)}</>
      ),
    },
    {
      field: 'reachedAmount',
      headerName: t('campaigns:donationsAmount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/admin/donations?campaignId=${cellValues.row.id}`}>
          <DisplayReachedAmount params={cellValues} />
        </Link>
      ),
    },
    {
      field: 'currentAmount',
      headerName: t('campaigns:amount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <DisplayCurrentAmount params={cellValues} />
      ),
    },
    {
      field: 'blockedAmount',
      headerName: t('campaigns:blockedAmount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <DisplayBlockedAmount params={cellValues} />
      ),
    },
    {
      field: 'withdrawnAmount',
      headerName: t('campaigns:withdrawnAmount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <DisplayWithdrawnAmount params={cellValues} />
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
      width: 230,
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
      width: 230,
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
      width: 230,
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
      width: 230,
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
      width: 230,
      headerAlign: 'left',
    },
  ]

  return (
    <>
      <Toolbar
        sx={{
          background: 'white',
          borderTop: '1px solid lightgrey',
          display: 'flex',
          justifyContent: 'space-between',
          height: '64px',
        }}>
        <Link href={routes.admin.campaigns.create}>
          <Button variant="outlined" endIcon={<AddIcon />}>
            <Typography>Създай нова кампания</Typography>
          </Button>
        </Link>
      </Toolbar>
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
        pageSize={10}
        editMode="row"
      />
      <Box>
        {selectedCampaign && (
          <DetailsModal campaign={selectedCampaign} onClose={() => setViewId(undefined)} />
        )}
        {deleteId && (
          <DeleteModal
            id={deleteId}
            onDelete={() => {
              refetch()
              setDeleteId(undefined)
            }}
            onClose={() => setDeleteId(undefined)}
          />
        )}
      </Box>
    </>
  )
}
