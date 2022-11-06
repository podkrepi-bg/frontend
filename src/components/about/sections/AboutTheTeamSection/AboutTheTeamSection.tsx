import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

import Heading from 'components/common/Heading'

import { DiscordTeamImage } from './AboutTheTeamSection.styled'

export default function AboutTheTeamSection() {
  const { t } = useTranslation('about')
  const discordTeamImagePath = '/img/team-photos/discord-team-image.jpg'

  return (
    <Grid component="section">
      <Heading variant="h4" component="h2">
        {t('about.about-the-team')}
      </Heading>
      <Typography variant="body2">{t('about.team-description')}</Typography>
      <DiscordTeamImage>
        <Image alt="Discord team image" src={discordTeamImagePath} width="1189px" height="789px" />
      </DiscordTeamImage>
    </Grid>
  )
}
