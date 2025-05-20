import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { CampaignResponse } from 'gql/campaigns'
import 'react-quill/dist/quill.bubble.css'

import { Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { Assessment, InfoOutlined } from '@mui/icons-material'
import EmailIcon from '@mui/icons-material/Email'
import { styled } from '@mui/material/styles'

import { ImageSlider } from 'components/common/ImageSlider'
import LinkButton from 'components/common/LinkButton'
import { campaignSliderUrls } from 'common/util/campaignImageUrls'
import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { useCanEditCampaign } from 'common/hooks/campaigns'
import { moneyPublic } from 'common/util/money'
import { routes } from 'common/routes'

import DonationWishes from './DonationWishes'
import CampaignInfo from './CampaignInfo/CampaignInfo'
import CampaignInfoGraphics from './CampaignInfoGraphics'
import CampaignInfoOperator from './CampaignInfoOperator'
import CampaignPublicExpensesGrid from './CampaignPublicExpensesGrid'
import CampaignPublicExpensesChart from './CampaignPublicExpensesChart'
import RenderCampaignSubscribeModal from '../notifications/CampaignSubscribeModal'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const CampaignNewsSection = dynamic(() => import('./CampaignNewsSection'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
  irregularityIcon: `${PREFIX}-irregularityIcon`,
  subscribeLink: `${PREFIX}-subscribe`,
  financeSummary: `${PREFIX}-financeSummary`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.banner}`]: {
    zIndex: -1,
    maxHeight: '504px !important',
    marginTop: `${theme.spacing(10)} !important`,
    objectFit: 'cover',
    [theme.breakpoints.down('md')]: {
      marginTop: `${theme.spacing(30.5)} !important`,
    },
  },

  [`& .${classes.campaignTitle}`]: {
    marginTop: theme.spacing(6),
    letterSpacing: '-1.5px',
    fontSize: theme.typography.pxToRem(32),
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(45),
      marginTop: 0,
      marginBottom: theme.spacing(1),
    },
  },

  ['& .ql-editor']: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    lineHeight: theme.spacing(4),
    paddingLeft: '0',
    paddingRight: '0',
  },
  ['& .ql-container']: {
    fontFamily: theme.typography.fontFamily,
  },

  [`& .${classes.linkButton}`]: {
    fontSize: theme.typography.pxToRem(16),
    letterSpacing: theme.spacing(0.01),
    lineHeight: '150%',
    textDecoration: 'underline',
    color: '#11356A',

    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },

  [`& .${classes.irregularityIcon}`]: {
    width: theme.spacing(2.25),
    height: theme.spacing(2.75),
  },
  [`& .${classes.subscribeLink}`]: {
    fontWeight: 500,
    fontSize: theme.typography.pxToRem(16.5),
    textAlign: 'center',

    '&:hover': {
      textDecoration: 'underline',
      transform: 'scale(1.01)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  },
  [`& .${classes.financeSummary}`]: {
    fontSize: theme.typography.pxToRem(19),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      fontSize: theme.typography.pxToRem(21),
    },
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignDetails({ campaign }: Props) {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)
  const sliderImages = campaignSliderUrls(campaign)
  const canEditCampaign = useCanEditCampaign(campaign.slug)
  const { data: expensesList } = useCampaignApprovedExpensesList(campaign.slug)
  const totalExpenses = expensesList?.reduce((acc, expense) => acc + expense.amount, 0)

  return (
    <StyledGrid item xs={12} md={8}>
      <Typography variant="h1" component="h1" mb={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo
        campaign={campaign}
        showExpensesLink={(expensesList && expensesList?.length > 0) || canEditCampaign}
      />
      <Grid container spacing={8}>
        <Grid item xs={12} display="flex" alignItems="center" sx={{ mt: 1.5 }}>
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            cursor="pointer"
            onClick={() => setSubscribeOpen(true)}
          />
          <Typography onClick={() => setSubscribeOpen(true)} className={classes.subscribeLink}>
            {t('common:notifications.subscribe')}
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: '20px' }}>
          <ReactQuill readOnly theme="bubble" value={campaign.description} />
        </Grid>
        <Grid item xs={12}>
          <ImageSlider sliderImages={sliderImages} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <CampaignInfoOperator campaign={campaign} />
        </Grid>
        <CampaignInfoGraphics />
        <Grid container item xs={12} spacing={4} id="expenses">
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" my={4}>
              {t('campaigns:campaign.financial-report')} <Assessment />
              {canEditCampaign ? (
                <Tooltip title={t('campaigns:cta.edit')}>
                  <LinkButton
                    href={routes.campaigns.viewExpenses(campaign.slug)}
                    variant="contained"
                    endIcon={<EditIcon />}
                  />
                </Tooltip>
              ) : (
                ''
              )}
            </Typography>
            <CampaignFinanceSummary campaign={campaign} expenses={totalExpenses ?? 0} />
          </Grid>
          {(expensesList?.length || canEditCampaign) && (
            <>
              <Grid item xs={12}>
                <CampaignPublicExpensesChart
                  slug={campaign.slug}
                  height={120}
                  reachedAmount={campaign.summary.reachedAmount}
                  currency={campaign.currency}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <CampaignPublicExpensesGrid slug={campaign.slug} />
              </Grid>
            </>
          )}
        </Grid>
        <CampaignNewsSection campaign={campaign} canCreateArticle={canEditCampaign} />
        {subscribeIsOpen && (
          <RenderCampaignSubscribeModal setOpen={setSubscribeOpen} campaign={campaign} />
        )}
        <Grid item xs={12} display="flex" mt={2} mb={2}>
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            onClick={() => setSubscribeOpen(true)}
            cursor="pointer"
          />
          <Typography onClick={() => setSubscribeOpen(true)} className={classes.subscribeLink}>
            {t('common:notifications.subscribe')}
          </Typography>
        </Grid>
        <Grid item xs={12} id="wishes">
          <DonationWishes campaignId={campaign?.id} />
        </Grid>
        <Grid container item xs={12}>
          <LinkButton
            startIcon={<NotificationsActiveOutlinedIcon className={classes.irregularityIcon} />}
            href={`/campaigns/${campaign.slug}/irregularity`}
            className={classes.linkButton}>
            {t('campaigns:campaign.report-campaign')}
          </LinkButton>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}

type CampaignFinanceProps = Props & {
  expenses: number
}
const CampaignFinanceSummary = ({ campaign, expenses }: CampaignFinanceProps) => {
  const total = (campaign.summary.guaranteedAmount ?? 0) + campaign.summary.reachedAmount
  const transferred = campaign.summary.blockedAmount + campaign.summary.withdrawnAmount
  const { t } = useTranslation()
  return (
    <StyledGrid item>
      <Typography variant="h5" fontWeight={500}>
        {t('campaigns:campaign-details-report.amount-collected')}: {moneyPublic(total)}
      </Typography>
      <Typography className={classes.financeSummary}>
        {t('campaigns:campaign-details-report.available')}:{' '}
        {moneyPublic(campaign.summary.currentAmount)}
        <Tooltip enterTouchDelay={0} title="Средства налични по сметката на Podkrepi.bg">
          <IconButton size="small" color="primary">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Typography className={classes.financeSummary}>
        {t('campaigns:campaign-details-report.guaranteed')}:{' '}
        {moneyPublic(campaign.summary.guaranteedAmount ?? 0)}
        <Tooltip
          enterTouchDelay={0}
          title={
            'Дарения от служители или клиенти на компании, които имат вътрешни дарителски инициативи с партньорска интеграция към Подкрепи.бг. При такова дарение сумите се отразяват веднага в платформата като "гарантирани" от компанията и се превеждат веднъж в месеца като консолидирана сума към Подкрепи.бг с цел по-лесно управление.'
          }>
          <IconButton size="small" color="primary">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Typography className={classes.financeSummary} fontWeight={600}>
        {t('campaigns:campaign-details-report.transferred')}: {moneyPublic(transferred)}
        <Tooltip
          enterTouchDelay={0}
          title="Средства преведени от сметката на Podkrepi.bg към организатора на кампанията">
          <IconButton size="small" color="primary">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
      <Typography className={classes.financeSummary}>
        {t('campaigns:campaign-details-report.accounted')}: {moneyPublic(expenses)}
        <Tooltip enterTouchDelay={0} title="Отчетени разходи">
          <IconButton size="small" color="primary">
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>
    </StyledGrid>
  )
}
