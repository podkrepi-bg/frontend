import React from 'react'
import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import { Container, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import CampaignFilter from './CampaignFilter'

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(12),
      fontWeight: '500',
      color: '#2196F3',
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontSize: '45px',
      lineHeight: '112px',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: '-1.5px',
    },
    subheading: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '175 %',
      textAlign: 'center',
      letterSpacing: '0.15px',
    },
    support: {
      marginBottom: theme.spacing(6),
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '35px',
      lineHeight: '120%',
      textAlign: 'center',
      color: '#2196F3',
      letterSpacing: '-0.5px',
    },
    applyButton: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(1.5, 6),
      margin: theme.spacing(5, 0),
    },
    arrowIcon: {
      fontSize: theme.spacing(8),
    },
  }),
)

export default function CampaignsPage() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Layout
      // sx={{ fontWeight: '500', color: '#2196F3' }}
      // title={t('campaigns:campaigns')}
      metaDescription={t('campaigns:campaign.subheading')}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CampaignsPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5100%3A21216">
      <Container maxWidth="lg">
        <Typography variant="h1" component="p" className={classes.title}>
          {t('campaigns:campaigns')}
        </Typography>
        <Typography variant="h2" component="p" className={classes.support}>
          {t('campaigns:cta.support-cause-today')}
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.subheading}>
          {t('campaigns:campaign.subheading')}
        </Typography>
        <Typography variant="h6" component="p" className={classes.subheading}>
          {t('campaigns:campaign.subheading-bold')}
        </Typography>
        <Typography variant="h6" component="p" className={classes.subheading}>
          {t('campaigns:campaign.subheading-bold-secondary')}
        </Typography>
        <CampaignFilter />
      </Container>
    </Layout>
  )
}
