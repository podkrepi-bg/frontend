import React from 'react'
import { useTranslation } from 'next-i18next'
import { useViewCampaign } from 'common/hooks/campaigns'
import Layout from 'components/layout/Layout'
import ViewCampaignProgressCard from './ViewCampaignProgressCard'
import NotFoundPage from 'pages/404'
import { Grid, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    campaignDescription: {
      marginTop: theme.spacing(3),
    },
    outlinedButton: {
      color: theme.palette.primary.dark,
      border: `2px solid ${theme.palette.primary.dark}`,
      borderRadius: theme.spacing(3),
      width: '100%',
      whiteSpace: 'nowrap',
      height: theme.spacing(6),
      marginTop: theme.spacing(3),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    donateNowButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      width: '100%',
      height: theme.spacing(6),
      marginTop: theme.spacing(3),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    buttonWrapper: {
      display: 'inline-flex',
      width: '100%',
      gap: '12px',
    },
  }),
)

type Props = { slug: string }
export default function ViewCampaignPage({ slug }: Props) {
  const { t } = useTranslation()
  const classes = useStyles()
  const { data } = useViewCampaign(slug)

  if (!data || !data.campaign) return <NotFoundPage />

  const { campaign } = data
  return (
    <Layout title={campaign.title}>
      <Grid container spacing={7}>
        <Grid item xs={12} md={8}>
          <Typography>{t('campaigns:campaign.tag')}</Typography>
          <Typography>
            {t('campaigns:campaign.date')} {campaign.startDate}
          </Typography>
          <Typography className={classes.campaignDescription}>{campaign.description}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <ViewCampaignProgressCard />
        </Grid>
      </Grid>
    </Layout>
  )
}
