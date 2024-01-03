import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Heading } from '../../IndexPage.styled'
import { InfoText } from './SubscriptionSection.styled'
import { Grid } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import EmailIcon from '@mui/icons-material/Email'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import {
  SectionGridWrapper,
  SubscribeButton,
  SubscribeHeading,
  Subtitle,
} from '../PlatformStatisticsSection/PlatformStatisticsSection.styled'

export type SubscribeToNotificationsInput = {
  email: string
}

const SubscriptionSection = () => {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <SectionGridWrapper
      sx={(theme) => ({
        marginBottom: theme.spacing(5),
      })}>
      <Grid
        sx={(theme) => ({
          margin: '0 auto',
          maxWidth: theme.spacing(95),
          textAlign: 'center',
        })}>
        <Heading variant="h4">{t('index:subscription-section.heading')}</Heading>
        <InfoText>{t('index:subscription-section.content')}</InfoText>
        {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
        <Grid item xs={12} display="flex" mb={0.5} justifyContent="center">
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
        </SubscribeButton>
      </Grid>
    </SectionGridWrapper>
  )
}

export default SubscriptionSection
