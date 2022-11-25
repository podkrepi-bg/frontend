import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'

import { Heading, InfoText, OutlinedButton } from '../../IndexPage.styled'
import { Root } from './TeamMembersSection.styled'

export default function TeamMembersSection() {
  const { t } = useTranslation('index')
  const teamImagePath = '/img/team-photos/team-image.png'

  return (
    <Root>
      <Heading variant="h4">{t('team-section.heading')}</Heading>
      <InfoText maxWidth="lg">{t('team-section.content')}</InfoText>
      {/* A11Y TODO: Translate alt text */}
      <Image alt="Team image" src={teamImagePath} width={1095} height={150} layout="intrinsic" />
      <Grid>
        <OutlinedButton href={routes.about} variant="outlined" endIcon={<ChevronRightIcon />}>
          {t('team-section.meet-our-team')}
        </OutlinedButton>
      </Grid>
    </Root>
  )
}
