import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

import { CampaignResponse } from 'gql/campaigns'

import 'react-quill/dist/quill.bubble.css'

import { Button, Divider, Grid, Tooltip, Typography } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import { styled } from '@mui/material/styles'

import DonationWishes from './DonationWishes'
import CampaignSlider from './CampaignSlider'
import CampaignInfo from './CampaignInfo'
import CampaignInfoGraphics from './CampaignInfoGraphics'
import CampaignInfoOperator from './CampaignInfoOperator'
import LinkButton from 'components/common/LinkButton'
import { campaignSliderUrls } from 'common/util/campaignImageUrls'
import CampaignPublicExpensesGrid from './CampaignPublicExpensesGrid'
import EditIcon from '@mui/icons-material/Edit'
import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { Assessment, Email } from '@mui/icons-material'
import { routes } from 'common/routes'
import { useCanEditCampaign } from 'common/hooks/campaigns'
import { moneyPublic } from 'common/util/money'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import RenderCampaignSubscribeModal from '../notifications/CampaignSubscribeModal'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const CampaignNewsSection = dynamic(() => import('./CampaignNewsSection'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
  subscribeBtn: `${PREFIX}-subscribe`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
  securityIcon: `${PREFIX}-securityIcon`,
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
      marginBottom: theme.spacing(7),
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

  [`& .${classes.subscribeBtn}`]: {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.spacing(3),
    letterSpacing: theme.spacing(0.05),
    color: theme.palette.common.black,
    background: `${theme.palette.secondary.main}`,
    padding: theme.spacing(1.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    width: '50%',

    '&:hover': {
      background: theme.palette.primary.main,
    },
    '& svg': {
      color: '#333232 ',
    },
  },
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignDetails({ campaign }: Props) {
  const { t } = useTranslation()
  const sliderImages = campaignSliderUrls(campaign)
  const canEditCampaign = useCanEditCampaign(campaign.slug)
  const { data: expensesList } = useCampaignApprovedExpensesList(campaign.slug)
  const totalExpenses = expensesList?.reduce((acc, expense) => acc + expense.amount, 0)
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <StyledGrid item xs={12} md={8}>
      <Typography variant="h1" component="h1" mb={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo
        campaign={campaign}
        showExpensesLink={(expensesList && expensesList?.length > 0) || canEditCampaign}
      />
      {subscribeIsOpen && (
        <RenderCampaignSubscribeModal setOpen={setSubscribeOpen} campaign={campaign} />
      )}
      <Grid item textAlign="center" pr={15}>
        <Button
          onClick={() => setSubscribeOpen(true)}
          className={classes.subscribeBtn}
          endIcon={<Email />}>
          {t('campaigns:cta.subscribe')}
        </Button>
      </Grid>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <ReactQuill readOnly theme="bubble" value={campaign.description} />
        </Grid>
        <Grid item xs={12}>
          <CampaignSlider sliderImages={sliderImages} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <CampaignInfoOperator campaign={campaign} />
        </Grid>
        <CampaignInfoGraphics />
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
              <Typography>
                <ReceiptLongIcon /> {t('expenses:reported')}:{' '}
                {moneyPublic(totalExpenses || 0, campaign.currency)}
              </Typography>
            </Grid>
            <Grid item xs={12} mt={2}>
              <CampaignPublicExpensesGrid slug={campaign.slug} />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        <CampaignNewsSection campaign={campaign} canCreateArticle={canEditCampaign} />
        <Grid item xs={12}>
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
