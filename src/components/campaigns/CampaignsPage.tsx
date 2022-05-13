import React from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import Layout from 'components/layout/Layout'
import { Container, Typography } from '@mui/material'
import CampaignFilter from './CampaignFilter'

const PREFIX = 'CampaignsPage'

const classes = {
  title: `${PREFIX}-title`,
  subheading: `${PREFIX}-subheading`,
  support: `${PREFIX}-support`,
  applyButton: `${PREFIX}-applyButton`,
  arrowIcon: `${PREFIX}-arrowIcon`,
}

const StyledLayout = styled(Layout)(({ theme }) => ({
  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(12),
    fontWeight: '500',
    color: '#2196F3',
    fontStyle: 'normal',
    fontSize: '45px',
    lineHeight: '112px',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '-1.5px',
  },

  [`& .${classes.subheading}`]: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '175 %',
    textAlign: 'center',
    letterSpacing: '0.15px',
  },

  [`& .${classes.support}`]: {
    marginBottom: theme.spacing(6),
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '35px',
    lineHeight: '120%',
    textAlign: 'center',
    color: '#2196F3',
    letterSpacing: '-0.5px',
  },

  [`& .${classes.applyButton}`]: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1.5, 6),
    margin: theme.spacing(5, 0),
  },

  [`& .${classes.arrowIcon}`]: {
    fontSize: theme.spacing(8),
  },
}))

export default function CampaignsPage() {
  const { t } = useTranslation()

  return (
    <StyledLayout
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
    </StyledLayout>
  )
}
