import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Grid } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import EmailIcon from '@mui/icons-material/Email'
import { routes } from 'common/routes'

import { Heading, InfoText, OutlinedButton } from '../../IndexPage.styled'
import { Root } from './TeamMembersSection.styled'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import {
  SubscribeHeading,
  SubscribeButton,
  Subtitle,
  SectionGridWrapper,
} from '../PlatformStatisticsSection/PlatformStatisticsSection.styled'

export default function TeamMembersSection() {
  const { t } = useTranslation('index')
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  const teamImagePath = '/img/team-photos/team-image.png'

  return (
    <Root>
      <SectionGridWrapper>
        <Grid
          sx={(theme) => ({
            margin: '0 auto',
            maxWidth: theme.spacing(95),
          })}>
          <Heading variant="h4">{t('team-section.heading')}</Heading>
          <InfoText maxWidth="lg">{t('team-section.content')}</InfoText>
          <Box>
            <Image
              alt="Team image"
              src={teamImagePath}
              style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
              width={1095}
              height={150}
            />
          </Box>
          {/* A11Y TODO: Translate alt text */}
          <OutlinedButton href={routes.about} variant="outlined" endIcon={<ChevronRightIcon />}>
            {t('team-section.meet-our-team')}
          </OutlinedButton>
          {/* The following should be uncommented when the backend is ready */}

          {/* {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
          <Grid item xs={12} display="flex" sx={{ mt: 7.5, mb: 0.5 }} justifyContent="center">
            <EmailIcon
              color="primary"
              fontSize="small"
              sx={{ mr: 0.5 }}
              onClick={() => setSubscribeOpen(true)}
              cursor="pointer"
            />
            <SubscribeHeading onClick={() => setSubscribeOpen(true)}>
              {t('campaigns:cta.subscribe-monthly-newsletter')}
            </SubscribeHeading>
          </Grid>
          <Subtitle>{t('campaigns:cta.subscribe-general-monthly-newsletter')}</Subtitle>
          <SubscribeButton
            onClick={() => setSubscribeOpen(true)}
            variant="contained"
            endIcon={<ArrowForwardSharp />}>
            {t('campaigns:cta.subscribe-general-newsletter-button')}
          </SubscribeButton> */}
        </Grid>
      </SectionGridWrapper>
    </Root>
  )
}
