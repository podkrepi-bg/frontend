import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography, Theme, makeStyles, createStyles } from '@material-ui/core'

import PrincipleCard from './PrincipleCard'
import AwarenessIcon from '../icons/AwarenessIcon'
import ExpertiseIcon from '../icons/ExpertiseIcon'
import PrivacyIcon from '../icons/PrivacyIcon'
import ProactiveIcon from '../icons/ProactiveIcon'
import RespectIcon from '../icons/RespectIcon'
import TransparencyIcon from '../icons/TransparencyIcon'
import VoluntaryIcon from '../icons/VoluntaryIcon'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
    },
  }),
)
export default function PrinciplesThatUniteUs() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Typography variant="h4" component="h2" align="center" className={classes.title}>
          {t('about:principlesThatUniteUs.title')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={VoluntaryIcon}
          heading={t('about:principlesThatUniteUs.voluntary.heading')}
          content={t('about:principlesThatUniteUs.voluntary.content')}
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
          Icon={ExpertiseIcon}
          heading={t('about:principlesThatUniteUs.expertise.heading')}
          content={t('about:principlesThatUniteUs.expertise.content')}
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
          Icon={TransparencyIcon}
          heading={t('about:principlesThatUniteUs.transparency.heading')}
          content={t('about:principlesThatUniteUs.transparency.content')}
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
          Icon={AwarenessIcon}
          heading={t('about:principlesThatUniteUs.awareness.heading')}
          content={t('about:principlesThatUniteUs.awareness.content')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PrincipleCard
          Icon={AwarenessIcon}
          heading={t('about:principlesThatUniteUs.sharing.heading')}
          content={t('about:principlesThatUniteUs.sharing.content')}
        />
      </Grid>
    </Grid>
  )
}
