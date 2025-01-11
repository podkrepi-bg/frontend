import { useTranslation } from 'next-i18next'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Button, Box } from '@mui/material'

import Link from 'components/common/Link'
import { useUserCampaignNotificationSubscriptions } from 'common/hooks/notification'

import { useState } from 'react'
import { styled } from '@mui/material/styles'
import RenderCampaignNotificationsConfirmModal from './MyNotificationsCampaignConfirmModal'
import ContentTypography from 'components/client/faq/contents/ContentTypography'
import { getRelativeDate } from 'common/util/date'
import theme from 'common/theme'

const PREFIX = 'MyNotificationsTab'

const classes = {
  h3: `${PREFIX}-h3`,
  thinFont: `${PREFIX}-thinFont`,
  smallText: `${PREFIX}-smallText`,
  boxTitle: `${PREFIX}-boxTitle`,
  statusBoxRow: `${PREFIX}-statusBoxRow`,
  notificationsBox: `${PREFIX}-notificationBox`,
  statusBtn: `${PREFIX}-statusBtn`,
  statusActive: `${PREFIX}-statusActive`,
  statusInactive: `${PREFIX}-statusInactive`,
}

const StyledGrid = styled('div')(({ theme }) => ({
  [`& .${classes.statusBtn}`]: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.spacing(3),
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.common.black,
    background: `${theme.palette.secondary.main}`,
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    width: theme.spacing(20),

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#333232 ',
    },
  },
}))

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  background: theme.palette.common.white,
  width: 'calc(100% - 48px)',
  left: '24px',
  overflowY: 'auto',
  overflowX: 'hidden',
  borderRadius: '0 0 13px 13px',
}))

export default function MyCampaignNotificationsTable() {
  const { t, i18n } = useTranslation()
  const { data = [] } = useUserCampaignNotificationSubscriptions()

  const [confirmModalId, setConfirmModalId] = useState('')

  const commonProps: Partial<GridColDef> = {
    align: 'left',
    width: 100,
    headerAlign: 'left',
  }

  const columns: GridColDef[] = [
    {
      field: 'campaign.id',
      headerName: t('campaigns:actions'),
      align: 'left',
      width: 180,
      headerAlign: 'left',
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <StyledGrid>
            <Button
              className={classes.statusBtn}
              onClick={() => {
                setConfirmModalId(cellValues.row.campaignId)
              }}>
              {t('profile:myNotifications.campaign.cta')}
            </Button>
          </StyledGrid>
        )
      },
    },
    {
      field: 'campaign.title',
      headerName: t('campaigns:title'),
      ...commonProps,
      align: 'left',
      width: 450,
      renderCell: (cellValues: GridRenderCellParams) => (
        <Link href={`/campaigns/${cellValues.row.campaign?.slug}`} fontSize={20}>
          {cellValues.row.campaign.title}
        </Link>
      ),
    },
    {
      field: 'campaign.state',
      headerName: t('campaigns:status'),
      ...commonProps,
      align: 'left',
      width: 120,
      renderCell: (cellValues: GridRenderCellParams) => (
        <ContentTypography fontWeight={500}>{cellValues.row.campaign?.state}</ContentTypography>
      ),
    },
    {
      field: 'endDate',
      headerName: t('campaigns:endDate'),
      ...commonProps,
      align: 'left',
      width: 250,
      renderCell: (cellValues: GridRenderCellParams) => (
        <ContentTypography fontWeight={500}>
          {getRelativeDate(cellValues.row.campaign?.endDate, i18n?.language)}
        </ContentTypography>
      ),
    },
  ]
  return (
    <>
      {confirmModalId && (
        <RenderCampaignNotificationsConfirmModal
          campaignId={confirmModalId}
          setOpen={setConfirmModalId}
        />
      )}
      {data.length !== 0 ? (
        <StyledDataGrid
          rows={data || []}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          editMode="row"
          autoHeight
        />
      ) : (
        <Box sx={{ fontSize: 20 }}>{t('profile:myNotifications.campaign.noSubscriptions')}</Box>
      )}
    </>
  )
}
