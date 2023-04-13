import React from 'react'

import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'

import { CampaignResponse } from 'gql/campaigns'

import 'react-quill/dist/quill.bubble.css'

import { Divider, Grid, Tooltip, Typography } from '@mui/material'
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
import { Assessment } from '@mui/icons-material'
import { routes } from 'common/routes'
import { useCanEditCampaign } from 'common/hooks/campaigns'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const PREFIX = 'CampaignDetails'

const classes = {
  banner: `${PREFIX}-banner`,
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
}))

type Props = {
  campaign: CampaignResponse
}

export default function CampaignDetails({ campaign }: Props) {
  const { t } = useTranslation()
  const sliderImages = campaignSliderUrls(campaign)
  const canEditExpenses = useCanEditCampaign(campaign.slug)
  const { data: expensesList } = useCampaignApprovedExpensesList(campaign.slug)

  return (
    <StyledGrid item xs={12} md={8}>
      <Typography variant="h1" component="h1" mb={8} className={classes.campaignTitle}>
        {campaign.title}
      </Typography>
      <CampaignInfo campaign={campaign} />
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
        {expensesList?.length || canEditExpenses ? (
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h4" component="h4" my={8}>
                {t('campaigns:campaign.financial-report')} <Assessment />
                {canEditExpenses ? (
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
            <Grid item xs={12} mt={2}>
              <CampaignPublicExpensesGrid slug={campaign.slug} />
            </Grid>
          </Grid>
        ) : (
          ''
        )}

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
