import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Typography } from '@mui/material'

import { DiscordTeamImage } from './AboutTheTeamSection.styled'
import { AboutHeading } from 'components/client/about/AboutPage.styled'

export default function AboutTheTeamSection() {
  const { t } = useTranslation('about')
  const discordTeamImagePath = '/img/team-photos/discord-team-image.jpg'

  return (
    <Grid component="section">
      <AboutHeading variant="h4">{t('about.about-the-team')}</AboutHeading>
      <Typography variant="body2">{t('about.team-description')}</Typography>
      <DiscordTeamImage>
        {/* A11Y TODO: Translate alt text */}
        <Image alt="Discord team image" src={discordTeamImagePath} width={1189} height={789} />
      </DiscordTeamImage>
    </Grid>
  )
}
