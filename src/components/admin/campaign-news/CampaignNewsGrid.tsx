import { UseQueryResult } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import AddIcon from '@mui/icons-material/Add'
import React, { useMemo, useState } from 'react'
import { Box, Button, Toolbar, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import { routes } from 'common/routes'
import Link from 'components/common/Link'
import { getExactDateTime, getRelativeDate } from 'common/util/date'
import theme from 'common/theme'

import GridActions from './GridActions'
import DeleteModal from './modals/DeleteModal'
import DetailsModal from './modals/DetailsModal'
import { useCampaignNewsAdminList } from 'common/hooks/campaign-news'
import { AdminCampaignNewsResponse } from 'gql/campaign-news'

export default function CampaignNewsGrid() {
  const { t, i18n } = useTranslation()
  const { data = [], refetch }: UseQueryResult<AdminCampaignNewsResponse[]> =
    useCampaignNewsAdminList()
  const [viewId, setViewId] = useState<string | undefined>()
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const selectedArticle = useMemo(() => data.find((c) => c.id === viewId), [data, viewId])
  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  })

  const columns: GridColDef[] = [
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
      headerName: t('campaigns:status'), //keep
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
      renderCell: (params: GridRenderCellParams) => (
        <Link href={routes.campaigns.news.viewSingleArticle(params.row.slug)}>
          {params.row.title}
        </Link>
      ),
    },
    {
      field: 'campaign',
      headerName: 'Кампания',
      ...commonProps,
      align: 'left',
      width: 350,
      renderCell: (params: GridRenderCellParams) => <>{params.row.campaign.title}</>,
    },
    {
      field: 'author',
      headerName: 'Автор',
      ...commonProps,
      align: 'left',
      width: 200,
      renderCell: (params: GridRenderCellParams) => <>{params.row.author}</>,
    },
    {
      field: 'createdAt',
      headerName: 'Създадена на',
      ...commonProps,
      align: 'left',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={getExactDateTime(params.row.createdAt)}>
          <Button color="inherit">{getRelativeDate(params.row.createdAt, i18n?.language)}</Button>
        </Tooltip>
      ),
    },
    {
      field: 'publishedAt',
      headerName: 'Публикувана на',
      ...commonProps,
      align: 'left',
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.row.publishedAt) return ''
        return (
          <Tooltip title={getExactDateTime(params.row.publishedAt)}>
            <Button color="inherit">
              {getRelativeDate(params.row.publishedAt, i18n?.language)}
            </Button>
          </Tooltip>
        )
      },
    },
    {
      field: 'editedAt',
      headerName: 'Обновена на ',
      ...commonProps,
      align: 'left',
      width: 250,
      renderCell: (params: GridRenderCellParams) => {
        if (!params.row.editedAt) return ''
        return (
          <Tooltip title={getExactDateTime(params.row.editedAt)}>
            <Button color="inherit">{getRelativeDate(params.row.editedAt, i18n?.language)}</Button>
          </Tooltip>
        )
      },
    },
  ]

  return (
    <>
      <Toolbar
        sx={{
          background: theme.palette.common.white,
          borderTop: '1px solid lightgrey',
          display: 'flex',
          justifyContent: 'space-between',
          height: '64px',
        }}>
        <Link href={routes.admin.news.create}>
          <Button variant="outlined" endIcon={<AddIcon />}>
            <Typography>Създай нова новина</Typography>
          </Button>
        </Link>
      </Toolbar>
      <DataGrid
        sx={{
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
        pageSizeOptions={[5, 10, 20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        editMode="row"
      />
      <Box>
        {selectedArticle && (
          <DetailsModal article={selectedArticle} onClose={() => setViewId(undefined)} />
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
