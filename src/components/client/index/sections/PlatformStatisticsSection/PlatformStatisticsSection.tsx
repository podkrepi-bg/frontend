import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Grid2 } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import EmailIcon from '@mui/icons-material/Email'

import { routes } from 'common/routes'
import Statistics from './Statistics/Statistics'

import {
  Heading,
  HelpThoseInNeedButton,
  Root,
  SectionGridWrapper,
  Subtitle,
  SubscribeButton,
  SubscribeHeading,
} from './PlatformStatisticsSection.styled'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'

export default function PlatformStatisticsSection() {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <Root>
      <SectionGridWrapper>
        <Grid2
          sx={(theme) => ({
            margin: '0 auto',
            maxWidth: theme.spacing(67),
          })}>
          <Heading variant="h4">{t('index:platform-statistics.heading')}</Heading>
          <Subtitle>{t('index:platform-statistics.text')}</Subtitle>
          <HelpThoseInNeedButton
            href={routes.campaigns.index}
            variant="contained"
            endIcon={<ArrowForwardSharp />}>
            {t('index:platform-statistics.donate-to-those-in-need')}
          </HelpThoseInNeedButton>
          {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
          <Grid2 display="flex" sx={{ mt: 3.5, mb: 0.5 }} size={12}>
            <EmailIcon color="primary" fontSize="small" sx={{ mr: 0.5 }} cursor="pointer" />
            <SubscribeHeading>{t('common:notifications.subscribeGeneral')}</SubscribeHeading>
          </Grid2>
          <Subtitle>{t('common:notifications.subscribeGeneralSubtext')}</Subtitle>
          <SubscribeButton
            onClick={() => setSubscribeOpen(true)}
            variant="contained"
            endIcon={<ArrowForwardSharp />}>
            {t('common:notifications.subscribeGeneralButton')}
          </SubscribeButton>
        </Grid2>
        <Statistics />
      </SectionGridWrapper>
    </Root>
  );
}
