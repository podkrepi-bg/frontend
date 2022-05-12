import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'

import Heading from 'components/common/Heading'

import PrincipleCard from './PrincipleCard'
import AwarenessIcon from '../icons/AwarenessIcon'
import ExpertiseIcon from '../icons/ExpertiseIcon'
import PrivacyIcon from '../icons/PrivacyIcon'
import ProactiveIcon from '../icons/ProactiveIcon'
import RespectIcon from '../icons/RespectIcon'
import TransparencyIcon from '../icons/TransparencyIcon'
import VoluntaryIcon from '../icons/VoluntaryIcon'

export default function PrinciplesThatUniteUs() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={1}>
      <Grid xs={12} item>
        <Heading
          id="principles-that-unite-us"
          variant="h4"
          component="h1"
          align="center"
          sx={(theme) => ({
            color: theme.palette.primary.dark,
            pt: theme.spacing(5),
            pb: theme.spacing(3),
          })}
          linkable>
          {t('about:principlesThatUniteUs.title')}
        </Heading>
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
