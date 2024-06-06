import { Box, Button, CircularProgress, Link, TableBody, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import {
  useCancelGuaranteedDonationMutation,
  useGetAffiliateData,
  useJoinAffiliateProgramMutation,
} from 'common/hooks/affiliates'
import { TFunction, useTranslation } from 'next-i18next'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import theme from 'common/theme'
import { useMemo } from 'react'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableCell from '@mui/material/TableCell'
import { money } from 'common/util/money'
import { DonationResponse, TPaymentResponse } from 'gql/donations'
import { routes } from 'common/routes'
import { AffiliateWithDonationResponse, CancelAffiliateDonation } from 'gql/affiliate'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { useCopyToClipboard } from 'common/util/useCopyToClipboard'
import { AlertStore } from 'stores/AlertStore'

const PREFIX = 'AffiliateProgramTab'

const classes = {
  boxContainer: `${PREFIX}-boxContainer`,
  boxTitle: `${PREFIX}-boxTitle`,
  h1: `${PREFIX}-h1`,
  h2: `${PREFIX}-h2`,
  h3: `${PREFIX}-h3`,
  affiliateSummary: `${PREFIX}-affiliateSummary`,
}

const Root = styled(Box)(({ theme }) => ({
  [`& .${classes.h1}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(30),
    lineHeight: '65px',
    paddingLeft: 2,
  },
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(25),
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.h2}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(23),
    lineHeight: '116.7%',
    marginBottom: theme.spacing(3),
  },
  [`& .${classes.boxTitle}`]: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3, 9),
    paddingBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    boxShadow: theme.shadows[3],
  },

  [`& .${classes.affiliateSummary}`]: {
    marginBottom: theme.spacing(2),
  },
}))

type Props = {
  t: TFunction
  children: React.ReactNode
}

function AffiliateTabContainer({ t, children }: Props) {
  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:affiliate.index')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.affiliateProgram}>{children}</ProfileTab>
    </Root>
  )
}

type AffiliateSummaryProps = {
  affiliate: AffiliateWithDonationResponse
}

function AffiliateSummaryTable({ affiliate }: AffiliateSummaryProps) {
  const { t } = useTranslation()
  const [, copyUrl] = useCopyToClipboard(1000)
  const totalSum = useMemo<number>(() => {
    return (
      affiliate?.payments?.reduce((prev: number, curr: TPaymentResponse) => {
        return (prev += curr.amount)
      }, 0) ?? 0
    )
  }, [affiliate?.payments])

  return (
    <Box sx={{ marginBottom: 10 }}>
      <Typography className={classes.h3} sx={{ py: 1 }}>
        {t('profile:affiliate.data-summary')}
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 723 }}>
        <Table aria-label="affiliate-summary">
          <TableHead>
            <TableRow>
              <TableCell>{t('profile:affiliate.status.index')}</TableCell>
              <TableCell>{t('profile:affiliate.code')}</TableCell>
              <TableCell>{t('profile:affiliate.guaranteedDonations')}</TableCell>
              <TableCell>{t('profile:affiliate.guaranteedAmount')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{t(`profile:affiliate.status.${affiliate.status}`)}</TableCell>
              <TableCell>
                <Box flexDirection={'row'} sx={{ alignItems: 'center' }}>
                  {affiliate.affiliateCode}
                  {affiliate.affiliateCode !== null && (
                    <Button
                      sx={{ padding: 0 }}
                      onClick={() => {
                        AlertStore.show(t('common:alerts.message-copy'), 'success')
                        copyUrl(affiliate.affiliateCode)
                      }}>
                      <ContentPasteIcon />
                    </Button>
                  )}
                </Box>
              </TableCell>
              <TableCell>{affiliate.payments.length}</TableCell>
              <TableCell>{money(totalSum ?? 0)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

type GuaranteedDonationsTableProps = {
  affiliate: AffiliateWithDonationResponse
}

function GuaranteedDonationsTable({ affiliate }: GuaranteedDonationsTableProps) {
  const cancelDonationMutation = useCancelGuaranteedDonationMutation()
  const onGuaranteedDonationCancel = (affiliateCode: string, donationId: string) => {
    const data: CancelAffiliateDonation = {
      affiliateCode,
      donationId,
    }
    cancelDonationMutation.mutate(data)
  }
  const { t } = useTranslation('')
  const columns: GridColDef<DonationResponse>[] = [
    {
      field: 'id',
      headerName: 'id',
      align: 'left',
      renderCell: (params: GridRenderCellParams) => <>{params.row.id}</>,
    },
    {
      field: 'amount',
      headerName: t('donations:amount'),
      renderCell: (params: GridRenderCellParams) => {
        return <Typography>{money(params.row.amount)}</Typography>
      },
      align: 'left',
    },
    {
      field: 'donor',
      headerName: t('profile:donations.donor'),
      valueGetter(params: GridRenderCellParams) {
        return params.row.metadata?.name ?? affiliate.company.companyName
      },
      align: 'left',
      width: 200,
    },
    {
      field: 'campaign',
      headerName: t('profile:donations.cause'),
      renderCell: (params: GridRenderCellParams) => (
        <Link href={routes.campaigns.viewCampaignBySlug(params.row.targetVault.campaign.slug)}>
          {params.row.targetVault.campaign.title}
        </Link>
      ),
      align: 'left',
      width: 200,
    },
    {
      field: 'cancel',
      headerName: t('profile:donations.cancelDonation'),
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Button
            onClick={() =>
              onGuaranteedDonationCancel(affiliate.affiliateCode, params.row.paymentId)
            }
            sx={{ color: theme.typography.subtitle1 }}>
            {t('profile:donations.cancel')}
          </Button>
        )
      },
      width: 150,
      align: 'left',
    },
  ]

  return (
    <Box>
      <Typography className={classes.h3} sx={{ py: 1 }}>
        {t('profile:affiliate.guaranteedDonationsList')}
      </Typography>
      <DataGrid
        style={{
          background: theme.palette.common.white,
          border: 'none',
          width: 'calc(100% - 48px)',
          left: '24px',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '0 0 13px 13px',
        }}
        columnVisibilityModel={{ id: false }}
        rows={affiliate.payments.flatMap((e) => e.donations) || []}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        editMode="row"
        autoHeight
      />
    </Box>
  )
}

export default function AffiliateProgramTab() {
  const { t } = useTranslation('')
  const { data: affiliate, isLoading, isSuccess, isError } = useGetAffiliateData()
  const joinMutation = useJoinAffiliateProgramMutation()

  const onAffilateJoinRequest = (): void => {
    joinMutation.mutate()
  }

  if (isError) {
    return <Typography>{t('common:alerts.error')}</Typography>
  }

  if (isLoading) {
    return (
      <AffiliateTabContainer t={t}>
        <CircularProgress />
      </AffiliateTabContainer>
    )
  }

  if (isSuccess && !affiliate) {
    return (
      <AffiliateTabContainer t={t}>
        <Typography className={classes.affiliateSummary}>
          {t('profile:affiliate.summary')}
        </Typography>
        <Button variant="outlined" onClick={onAffilateJoinRequest}>
          {t('profile:affiliate.join')}
        </Button>
      </AffiliateTabContainer>
    )
  }

  return (
    <AffiliateTabContainer t={t}>
      <AffiliateSummaryTable affiliate={affiliate} />
      <GuaranteedDonationsTable affiliate={affiliate} />
    </AffiliateTabContainer>
  )
}
