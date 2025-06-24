import { useListAdminNews } from 'common/hooks/campaign-news'
import Layout from 'components/client/layout/Layout'
import { Box, Button, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { formatDateString } from 'common/util/date'
import DeleteModal from './modals/DeleteModal'
import { routes } from 'common/routes'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'

import theme from 'common/theme'

const PREFIX = 'NewsAdminPage'

const classes = {
  grid: `${PREFIX}-grid`,
  gridColumn: `${PREFIX}-gridColumn`,
  cellSetting: `${PREFIX}-cellSetting`,
}

const Root = styled(Layout)({
  [`& .${classes.gridColumn}`]: {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: '700',
    },
  },
  [`& .${classes.cellSetting}`]: {
    lineBreak: 'normal',
  },
})

type Props = {
  slug: string
  isAdmin: boolean
}

export function NewsAdminPage({ slug, isAdmin }: Props) {
  const { data, isError, isLoading } = useListAdminNews(slug)
  const { t, i18n } = useTranslation('news')
  const [deleteId, setDeleteId] = useState<string | undefined>()
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  })

  if (isLoading) return <Layout maxWidth={false} />
  if (isError) {
    return <Layout maxWidth={false} />
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'slug', headerName: 'slug' },
    {
      field: 'title',
      headerName: t('article.title'),
      headerClassName: classes.gridColumn,
      cellClassName: classes.cellSetting,
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return <span style={{ overflow: 'visible' }}>{params.row.title}</span>
      },
    },
    {
      field: 'author',
      headerName: t('article.author'),
      headerClassName: classes.gridColumn,
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return params.row.author
      },
    },
    {
      field: 'createdAt',
      headerName: t('article.createdAt'),
      headerClassName: classes.gridColumn,
      align: 'left',
      flex: 1,
      minWidth: 140,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return formatDateString(params.row.createdAt)
      },
    },
    {
      field: 'publishedAt',
      headerName: t('article.publishedAt'),
      headerClassName: classes.gridColumn,
      align: 'left',
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        const date: Date = params.row.publishedAt
        return date ? formatDateString(date) : ''
      },
    },
    {
      field: 'editedAt',
      headerName: t('article.lastEdit'),
      headerClassName: classes.gridColumn,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return params.row.editedAt ? formatDateString(params.row.editedAt) : ''
      },
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'status',
      headerName: t('article.status'),
      headerClassName: classes.gridColumn,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return t(`news:status:${params.row.state}`)
      },
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'actions',
      headerName: t('article.actions.header'),
      headerClassName: classes.gridColumn,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        const cantEdit = params.row.state === 'published' && !isAdmin ? true : false
        return (
          <Box>
            <Link href={routes.campaigns.news.viewSingleArticle(params.row.slug)} passHref>
              <IconButton size="small" color="primary">
                <PageviewOutlinedIcon />
              </IconButton>
            </Link>
            <Tooltip title={cantEdit ? t('article.actions.no-access') : null}>
              <span>
                <Link
                  href={{
                    pathname: routes.campaigns.news.edit(slug),
                    query: { articleId: params.row.id },
                  }}
                  tabIndex={-1}
                  passHref
                  style={{ pointerEvents: cantEdit ? 'none' : 'all' }}>
                  <IconButton size="small" color="primary" disabled={cantEdit}>
                    <EditOutlinedIcon />
                  </IconButton>
                </Link>
              </span>
            </Tooltip>
            <Tooltip title={cantEdit ? t('article.actions.no-access') : null}>
              <span>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setDeleteId(params.row.id)}
                  disabled={cantEdit}>
                  <DeleteOutlinedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )
      },
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
    },
  ]

  return (
    <Root maxWidth={false}>
      <Grid container direction={'column'} spacing={1}>
        <Grid item>
          <Typography fontSize={24} component={'h1'} fontWeight={'medium'}>
            {data.title}
          </Typography>
          <Link
            href={{
              pathname: routes.campaigns.news.create(slug),
              query: { campaignId: data.id },
            }}
            passHref>
            <Button variant="outlined" endIcon={<AddIcon />}>
              <Typography>{t('write-new-article')}</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <DataGrid
            rows={data.campaignNews || []}
            columns={columns}
            columnVisibilityModel={{
              id: false,
              slug: false,
            }}
            pageSizeOptions={[5, 10, 20]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pagination
            autoHeight
            disableRowSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: 'createdAt', sort: 'desc' }],
              },
            }}
            getRowHeight={() => 'auto'}
            sx={{
              minWidth: 1000,

              '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': {
                py: '8px',
              },
              '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': {
                py: '15px',
              },
              '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': {
                py: '22px',
              },
            }}
          />
        </Grid>
        <Box>
          {deleteId && (
            <DeleteModal
              id={deleteId}
              slug={slug}
              onDelete={() => {
                setDeleteId(undefined)
              }}
              onClose={() => setDeleteId(undefined)}
            />
          )}
        </Box>
      </Grid>
    </Root>
  )
}
