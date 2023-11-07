import { Box, Button, CircularProgress, Link, TableBody, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import ProfileTab from './ProfileTab'
import { ProfileTabs } from './tabs'
import {
  useCancelGuaranteedDonationMutation,
  useGetAffiliateData,
  useJoinAffiliateProgramMutation,
} from 'common/hooks/affiliates'
import { TFunction } from 'next-i18next'
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
import { DonationResponse } from 'gql/donations'
import { routes } from 'common/routes'
import { CancelAffiliateDonation } from 'gql/affiliate'

const PREFIX = 'AffiliateProgramTab'

const classes = {
  boxContainer: `${PREFIX}-boxContainer`,
  boxTitle: `${PREFIX}-boxTitle`,
  h1: `${PREFIX}-h1`,
  h2: `${PREFIX}-h2`,
  h3: `${PREFIX}-h3`,
}

const Root = styled(Box)(({ theme }) => ({
  [`& .${classes.h1}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '30px',
    lineHeight: '65px',
    paddingLeft: 2,
  },
  [`& .${classes.h3}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
    margin: '0',
  },
  [`& .${classes.h2}`]: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '23px',
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
}))

export default function AffiliateProgramTab() {
  const { t } = useTranslation('')
  const { data: affiliate, isLoading, isSuccess, isError } = useGetAffiliateData()
  const joinMutation = useJoinAffiliateProgramMutation()
  const cancelDonationMutation = useCancelGuaranteedDonationMutation()

  const onAffilateJoinRequest = () => {
    joinMutation.mutate()
  }

  const totalSum = useMemo(() => {
    return affiliate?.donations.reduce((prev: number, curr: DonationResponse) => {
      return (prev += curr.amount)
    }, 0)
  }, [affiliate?.donations])

  const onGuaranteedDonationCancel = (affiliateCode: string, donationId: string) => {
    const data: CancelAffiliateDonation = {
      affiliateCode,
      donationId,
    }
    cancelDonationMutation.mutate(data)
  }

  if (isError) {
    return <Typography>{t('common:alerts.error')}</Typography>
  }

  if (isLoading) {
    return (
      <AffiliateContainer t={t}>
        <CircularProgress />
      </AffiliateContainer>
    )
  }

  if (isSuccess && !affiliate) {
    return (
      <AffiliateContainer t={t}>
        <Typography>{t('profile:affiliate.join')}</Typography>
        <Button variant="outlined" onClick={onAffilateJoinRequest}>
          {t('profile:affiliate.join')}
        </Button>
      </AffiliateContainer>
    )
  }

  const columns: GridColDef[] = [
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
      valueGetter(params) {
        return params.row.metadata?.name ?? params.row.affiliate.company.companyName
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
            onClick={() => onGuaranteedDonationCancel(affiliate.affiliateCode, params.row.id)}
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
    <AffiliateContainer t={t}>
      <Box sx={{ marginBottom: 10 }}>
        <Typography className={classes.h3} sx={{ py: 1 }}>
          {t('profile:affiliate.data-summary')}
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 660 }}>
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
                <TableCell>{affiliate.affiliateCode}</TableCell>
                <TableCell>{affiliate.donations.length}</TableCell>
                <TableCell>{money(totalSum ?? 0)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
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
          rows={affiliate.donations || []}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          editMode="row"
          autoHeight
        />
      </Box>
    </AffiliateContainer>
  )
}

type Props = {
  t: TFunction
  children: React.ReactNode
}

function AffiliateContainer({ t, children }: Props) {
  return (
    <Root>
      <Box className={classes.boxTitle}>
        <Typography className={classes.h3}>{t('profile:affiliate.index')}</Typography>
      </Box>
      <ProfileTab name={ProfileTabs.affiliateProgram}>{children}</ProfileTab>
    </Root>
  )
}
