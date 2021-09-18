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
    progressCardWrapper: {
      backgroundColor: '#c6eed6',
      borderRadius: theme.spacing(3),
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
        <Grid item xs={12} md={4} className={classes.progressCardWrapper}>
          <ViewCampaignProgressCard />
        </Grid>
      </Grid>
    </Layout>
  )
}
