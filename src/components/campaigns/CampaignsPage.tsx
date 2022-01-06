import React from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, Typography } from '@mui/material'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import LinkButton from 'components/common/LinkButton'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import CampaignsList from './CampaignsList'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(7),
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subheading: {
      marginBottom: theme.spacing(3),
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
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CampaignsPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5100%3A21216">
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" className={classes.heading}>
          {t('nav.campaigns.support')}
        </Typography>
        <Typography variant="subtitle2" component="p" className={classes.subheading}>
          {t('nav.campaigns.subheading')}
        </Typography>
        <Typography variant="h6" component="p" className={classes.subheading}>
          {t('nav.campaigns.subheading-bold')}
        </Typography>
        <Typography variant="h6" component="p" className={classes.subheading}>
          {t('nav.campaigns.subheading-bold-secondary')}
        </Typography>
        <Box textAlign="center" marginBottom={4}>
          <LinkButton
            href={routes.campaigns.create}
            variant="contained"
            size="small"
            className={classes.applyButton}
            endIcon={<ArrowForwardIosIcon />}>
            {t('nav.campaigns.apply')}
          </LinkButton>
        </Box>
        <CampaignsList />
      </Container>
    </Layout>
  )
}
