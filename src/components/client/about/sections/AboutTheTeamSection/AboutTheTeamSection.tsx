import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

import { DiscordTeamImage } from './AboutTheTeamSection.styled'
import { AboutHeading } from 'components/client/about/AboutPage.styled'

export default function AboutTheTeamSection() {
  const { t } = useTranslation('about')

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.about-the-team')}</AboutHeading>
      <Typography variant="body2">{t('about.team-description')}</Typography>
    </Grid>
  )
}
