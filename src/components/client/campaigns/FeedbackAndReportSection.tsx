import { Grid } from '@mui/material'
import LinkButton from 'components/common/LinkButton'
import React from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import { useTranslation } from 'react-i18next'
import { CampaignResponse } from 'gql/campaigns'
import { styled } from '@mui/material/styles'

const PREFIX = 'CampaignReport'

const classes = {
  banner: `${PREFIX}-banner`,
  campaignTitle: `${PREFIX}-campaignTitle`,
  linkButton: `${PREFIX}-linkButton`,
  securityIcon: `${PREFIX}-securityIcon`,
}

type Props = {
  campaign: CampaignResponse
}

const StyledButtons = styled(Grid)(({ theme }) => ({
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

export default function FeedbackAndReportSection({ campaign }: Props) {
  const { t } = useTranslation()
  return (
    <StyledButtons>
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
    </StyledButtons>
  )
}
