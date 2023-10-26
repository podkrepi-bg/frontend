import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

import { CampaignResponse } from 'gql/campaigns'

import 'react-quill/dist/quill.bubble.css'

import { Divider, Grid, Stack, Tooltip, Typography } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import { styled } from '@mui/material/styles'

import DonationWishes from './DonationWishes'
import CampaignSlider from './CampaignSlider'
import CampaignInfo from './CampaignInfo/CampaignInfo'
import CampaignInfoGraphics from './CampaignInfoGraphics'
import CampaignInfoOperator from './CampaignInfoOperator'
import LinkButton from 'components/common/LinkButton'
import { campaignSliderUrls } from 'common/util/campaignImageUrls'
import CampaignPublicExpensesGrid from './CampaignPublicExpensesGrid'
import EditIcon from '@mui/icons-material/Edit'
import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { Assessment } from '@mui/icons-material'
import { routes } from 'common/routes'
import { useCanEditCampaign } from 'common/hooks/campaigns'
import { moneyPublic } from 'common/util/money'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CampaignPublicExpensesChart from './CampaignPublicExpensesChart'
import EmailIcon from '@mui/icons-material/Email'
import RenderCampaignSubscribeModal from '../notifications/CampaignSubscribeModal'
{
  /*  just to test the page. to be removed 
// import SubscriptionPage from '../notifications/SubscriptionPage'*/
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const CampaignNewsSection = dynamic(() => import('./CampaignNewsSection'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
  securityIcon: `${PREFIX}-securityIcon`,
  subscribeLink: `${PREFIX}-subscribe`,
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
    fontSize: theme.spacing(2),
    fontWeight: 500,
    lineHeight: theme.spacing(4),
    paddingLeft: '0',
    paddingRight: '0',
  },

  [`& .${classes.linkButton}`]: {
    fontSize: theme.typography.pxToRem(10),
    letterSpacing: theme.spacing(0.01),
    lineHeight: '150%',
    textDecoration: 'underline',
    color: 'initial',

    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      backgroundColor: 'transparent',
    },
  },

  [`& .${classes.securityIcon}`]: {
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
        {subscribeIsOpen && (
          <RenderCampaignSubscribeModal setOpen={setSubscribeOpen} campaign={campaign} />
        )}
        <Grid item xs={12} display="flex" sx={{ mt: 1.5 }}>
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            onClick={() => setSubscribeOpen(true)}
            cursor="pointer"
          />
          <Typography onClick={() => setSubscribeOpen(true)} className={classes.subscribeLink}>
            {t('campaigns:cta.subscribe')}
          </Typography>
        </Grid>
        {/* just to test the page. to be removed 
        <SubscriptionPage email={"admin@abv.bg"} campaign={"odit-accusamus-quasi"} consent={"yes"} hash={"fdgfds"}/> */}
        <Grid item xs={12} style={{ paddingTop: '20px' }}>
          <ReactQuill readOnly theme="bubble" value={campaign.description} />
        </Grid>
        <Grid item xs={12}>
          <CampaignSlider sliderImages={sliderImages} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {expensesList?.length || canEditCampaign ? (
          <Grid item xs={12} id="expenses">
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
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" gap={1} alignItems="flex-start">
                <ReceiptLongIcon />
                <Stack direction="row" gap={1} flexWrap="wrap">
                  <Typography noWrap>
                    {t('expenses:reported')}: {moneyPublic(totalExpenses || 0, campaign.currency)}
                  </Typography>
                  <Typography noWrap>
                    {t('expenses:donations')}:{' '}
                    {moneyPublic(campaign.summary.reachedAmount, campaign.currency)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
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
          </Grid>
        ) : (
          ''
        )}
        <CampaignNewsSection campaign={campaign} canCreateArticle={canEditCampaign} />
        {subscribeIsOpen && (
          <RenderCampaignSubscribeModal setOpen={setSubscribeOpen} campaign={campaign} />
        )}
        <Grid item xs={12} display="flex">
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            onClick={() => setSubscribeOpen(true)}
            cursor="pointer"
          />
          <Typography onClick={() => setSubscribeOpen(true)} className={classes.subscribeLink}>
            {t('campaigns:cta.subscribe')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CampaignInfoOperator campaign={campaign} />
        </Grid>
        <CampaignInfoGraphics />
        <Grid item xs={12} id="wishes">
          <DonationWishes campaignId={campaign?.id} />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={12} mb={1}>
            <LinkButton
              startIcon={<SecurityIcon color="action" className={classes.securityIcon} />}
              href={'/contact'}
              className={classes.linkButton}>
              {t('campaigns:campaign.feedback')}
            </LinkButton>
          </Grid>
          <Grid item xs={12}>
            <LinkButton
              startIcon={<SecurityIcon color="action" className={classes.securityIcon} />}
              href={`/campaigns/${campaign.slug}/irregularity`}
              className={classes.linkButton}>
              {t('campaigns:campaign.report-campaign')}
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </StyledGrid>
  )
}
