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
    lineHeight: 1,

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

  const renderSubscribeInfo = () => (
    <>
      <EmailIcon
        onClick={() => setSubscribeOpen(true)}
        color="primary"
        fontSize="small"
        sx={{ mr: 0.5 }}
        cursor="pointer"
      />
      <Typography onClick={() => setSubscribeOpen(true)} className={classes.subscribeLink}>
        {t('common:notifications.subscribe')}
      </Typography>
    </>
  )

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
        <Grid item xs={12} display="flex" alignItems="center" gap="5px" sx={{ mt: 1.5 }}>
          {renderSubscribeInfo()}
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
        <Grid item xs={12} display="flex" alignItems="center" gap="5px" mt={2} mb={2}>
          {renderSubscribeInfo()}
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

interface FinanceItemProps {
  label: string
  tooltipTitle: string
  fontWeight?: number
  value: number
}

const FinanceItem = ({ label, value, tooltipTitle, fontWeight }: FinanceItemProps) => {
  const { t } = useTranslation('campaigns', { keyPrefix: 'campaign-details-report' })

  return (
    <Typography className={classes.financeSummary} fontWeight={fontWeight}>
      {t(label)}: {moneyPublic(value)}
      <Tooltip enterTouchDelay={0} title={t(tooltipTitle)}>
        <IconButton size="small" color="primary">
          <InfoOutlined fontSize="small" />
        </IconButton>
      </Tooltip>
    </Typography>
  )
}

const CampaignFinanceSummary = ({ campaign, expenses }: CampaignFinanceProps) => {
  const { currentAmount, guaranteedAmount, reachedAmount, withdrawnAmount, blockedAmount } =
    campaign.summary

  const total = (guaranteedAmount ?? 0) + reachedAmount
  const transferred = blockedAmount + withdrawnAmount
  const { t } = useTranslation('campaigns', { keyPrefix: 'campaign-details-report' })

  const financeItems: FinanceItemProps[] = [
    {
      label: 'available',
      value: currentAmount,
      tooltipTitle: 'available-tooltip',
    },
    {
      label: 'guaranteed',
      value: guaranteedAmount ?? 0,
      tooltipTitle: 'guaranteed-tooltip',
    },
    {
      label: 'transferred',
      value: transferred,
      tooltipTitle: 'transferred-tooltip',
      fontWeight: 600,
    },
    {
      label: 'accounted',
      value: expenses,
      tooltipTitle: 'accounted-tooltip',
    },
  ]

  return (
    <StyledGrid item>
      <Typography variant="h5" fontWeight={500}>
        {t('amount-collected')}: {moneyPublic(total)}
      </Typography>
      {financeItems.map(({ label, value, tooltipTitle, fontWeight }) => (
        <FinanceItem
          key={label}
          label={label}
          value={value}
          tooltipTitle={tooltipTitle}
          fontWeight={fontWeight}
        />
      ))}
    </StyledGrid>
  )
}
