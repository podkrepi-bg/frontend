import { bg, enUS } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { useState, useMemo } from 'react'
import { DataGrid, GridColDef, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { Tooltip, Button, Box, Typography, styled } from '@mui/material'

import { getExactDateTime, getRelativeDate } from 'common/util/date'
import { money } from 'common/util/money'
import { useGetUserCampaigns } from 'common/hooks/campaigns'
import Link from 'components/common/Link'
import GridActions from 'components/campaigns/grid/GridActions'
import {
  DisplayBeneficiary,
  DisplayBlockedAmount,
  DisplayCoordinator,
  DisplayCurrentAmount,
  DisplayExpandableDescription,
  DisplayOrganizer,
  DisplayReachedAmount,
} from 'components/campaigns/grid/CampaignGrid'
import DetailsModal from '../../campaigns/grid/modals/DetailsModal'
import DeleteModal from '../../campaigns/grid/modals/DeleteModal'
import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'

const PREFIX = 'MyCampaignsTab'

const classes = {
  h3: `${PREFIX}-h3`,
  thinFont: `${PREFIX}-thinFont`,
  smallText: `${PREFIX}-smallText`,
  boxTitle: `${PREFIX}-boxTitle`,
}

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.thinFont}`]: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
    margin: 0,
  },
  [`& .${classes.smallText}`]: {
    fontFamily: 'Lato, sans-serif',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '160%',
    letterSpacing: '0.15px',
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: 'white',
    padding: theme.spacing(3, 7),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },
}))

export default function MyCampaingsTable() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language == 'bg' ? bg : enUS
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const { data: campaigns = [], refetch } = useGetUserCampaigns()
  const selectedCampaign = useMemo(
    () => campaigns.find((c) => c.id === viewId),
    [campaigns, viewId],
  )
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
      field: 'description',
      headerName: t('campaigns:description'),
      ...commonProps,
      align: 'left',
      width: 350,
      renderCell: DisplayExpandableDescription,
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
          <Button color="inherit">{getRelativeDate(cellValues.row.startDate, locale)}</Button>
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
          <Button color="inherit">{getRelativeDate(cellValues.row.endDate, locale)}</Button>
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
          <Button color="inherit">{getRelativeDate(cellValues.row.createdAt, locale)}</Button>
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
          <Button color="inherit">{getRelativeDate(cellValues.row.updatedAt, locale)}</Button>
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
      {campaigns.length !== 0 ? (
        <>
          <Box className={classes.boxTitle}>
            <Typography className={classes.h3}>{t('profile:myCampaigns.history')}</Typography>
          </Box>
          <ProfileTab name={ProfileTabs.myCampaigns}>
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
              rows={campaigns || []}
              columns={columns}
              pageSize={5}
              editMode="row"
              autoHeight
              autoPageSize
            />
          </ProfileTab>
        </>
      ) : null}
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
