import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography, Theme, makeStyles, createStyles } from '@material-ui/core'

import PrincipleCard from './PrincipleCard'
import AwarenssIcon from '../icons/AwarenessIcon'
import ExpertiseIcon from '../icons/ExpertiseIcon'
import PrivacyIcon from '../icons/PrivacyIcon'
import ProactiveIcon from '../icons/ProactiveIcon'
import RespectIcon from '../icons/RespectIcon'
import TranperancyIcon from '../icons/TransparencyIcon'
import VoluntaryIcon from '../icons/VoluntaryIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingTop: theme.spacing(16.625),
      paddingBottom: theme.spacing(7),
      fontSize: theme.spacing(5),
      color: '#284E84',
    },
  }),
)
export default function PrinciplesThatUniteUs() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Typography variant="h2" component="p" align="center" className={classes.title}>
          {t('about:principlesThatUniteUs.title')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={VoluntaryIcon}
          heading={t('about:principlesThatUniteUs.voluntarily.heading')}
          content={t('about:principlesThatUniteUs.voluntarily.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={ProactiveIcon}
          heading={t('about:principlesThatUniteUs.proactivity.heading')}
          content={t('about:principlesThatUniteUs.proactivity.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={TranperancyIcon}
          heading={t('about:principlesThatUniteUs.transparency.heading')}
          content={t('about:principlesThatUniteUs.transparency.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={RespectIcon}
          heading={t('about:principlesThatUniteUs.respect.heading')}
          content={t('about:principlesThatUniteUs.respect.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={ExpertiseIcon}
          heading={t('about:principlesThatUniteUs.expertise.heading')}
          content={t('about:principlesThatUniteUs.expertise.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={PrivacyIcon}
          heading={t('about:principlesThatUniteUs.privacy.heading')}
          content={t('about:principlesThatUniteUs.privacy.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={AwarenssIcon}
          heading={t('about:principlesThatUniteUs.awareness.heading')}
          content={t('about:principlesThatUniteUs.awareness.content')}
        />
      </Grid>
    </Grid>
  )
}
