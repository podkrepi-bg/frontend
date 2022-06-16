import Link from 'next/link'
import { UseQueryResult } from 'react-query'
import { useTranslation } from 'next-i18next'
import AddIcon from '@mui/icons-material/Add'
import React, { useMemo, useState } from 'react'
import { Box, Toolbar, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import { AdminCampaignResponse } from 'gql/campaigns'
import { useCampaignAdminList } from 'common/hooks/campaigns'

import GridActions from './GridActions'
import DeleteModal from './modals/DeleteModal'
import DetailsModal from './modals/DetailsModal'
import ExternalLink from 'components/common/ExternalLink'
import { money } from 'common/util/money'
import { formatRelative, parseISO } from 'date-fns'
import { bg, enUS } from 'date-fns/locale'
import { getExactDate, getRelativeDate } from 'common/util/date'

interface CampaignCellProps {
  params: GridRenderCellParams<AdminCampaignResponse, AdminCampaignResponse>
}

const DisplayCoordinator = ({ params }: CampaignCellProps) => {
  return (
    <>
      {params.row.coordinator.person.firstName} {params.row.coordinator.person.lastName}
    </>
  )
}

const DisplayBeneficiary = ({ params }: CampaignCellProps) => {
  return (
    <>
      {params.row.beneficiary.person.firstName} {params.row.beneficiary.person.lastName}
    </>
  )
}

const DisplayCampaignType = ({ params }: CampaignCellProps) => {
  return <>{params.row.campaignType.name}</>
}

// #TODO: Remove when vaults work properly
const DisplayCurrentAmount = ({ params }: CampaignCellProps) => {
  const incoming = params.row.incomingTransfers.reduce((acc, transfer) => acc + transfer.amount, 0)
  const outgoing = params.row.outgoingTransfers.reduce((acc, transfer) => acc + transfer.amount, 0)
  const result = incoming - outgoing
  const avilableAmount = params.row.reachedAmount - result
  return <>{money(avilableAmount)}</>
}

export default function CampaignGrid() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS
  const { data = [], refetch }: UseQueryResult<AdminCampaignResponse[]> = useCampaignAdminList()
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const selectedCampaign = useMemo(() => data.find((c) => c.id === viewId), [data, viewId])
  console.log(data)
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
        <ExternalLink href={`/campaigns/${cellValues.row.slug}`}>
          {cellValues.row.title}
        </ExternalLink>
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
      renderCell: (params: GridRenderCellParams) => {
        return <DisplayCampaignType params={params} />
      },
      align: 'left',
      width: 250,
    },
    {
      field: 'description',
      headerName: t('campaigns:description'),
      ...commonProps,
      align: 'left',
      width: 350,
    },
    {
      field: 'reachedAmount',
      headerName: t('campaigns:donationsAmount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <ExternalLink href={`/admin/donations?campaignId=${cellValues.row.id}`}>
          {money(cellValues.row.reachedAmount)}
        </ExternalLink>
      ),
    },
    {
      field: 'targetAmount',
      headerName: t('campaigns:targetAmount'),
      ...commonProps,
      align: 'right',
      width: 150,
      renderCell: (cellValues: GridRenderCellParams) => <>{money(cellValues.row.targetAmount)}</>,
    },
    {
      field: 'currentAmound',
      headerName: t('campaigns:amount'),
      ...commonProps,
      align: 'right',
      width: 200,
      renderCell: (cellValues: GridRenderCellParams) => (
        <DisplayCurrentAmount params={cellValues} />
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
        <>{getRelativeDate(cellValues.row.startDate, locale)}</>
      ),
    },
    {
      field: 'endDate',
      headerName: t('campaigns:endDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{getRelativeDate(cellValues.row.endDate, locale)}</>
      ),
    },
    {
      field: 'createdAt',
      headerName: t('campaigns:createDate'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{getRelativeDate(cellValues.row.createdAt, locale)}</>
      ),
    },
    {
      field: 'updatedAt',
      headerName: t('campaigns:updatedAt'),
      align: 'left',
      width: 230,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => (
        <>{getRelativeDate(cellValues.row.updatedAt, locale)}</>
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

  const addIconStyles = {
    background: '#4ac3ff',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 1.2,
    boxShadow: 3,
  }

  return (
    <>
      <Toolbar
        sx={{
          background: 'white',
          borderTop: '1px solid lightgrey',
          display: 'flex',
          justifyContent: 'space-between',
          height: '72px',
        }}>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
          <Typography>Всички кампании</Typography>
        </Box>
        <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={routes.admin.campaigns.create} passHref>
              <AddIcon sx={addIconStyles} fontSize="large" />
            </Link>
          </Box>
        </Box>
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
        pageSize={5}
        editMode="row"
        autoHeight
        autoPageSize
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
