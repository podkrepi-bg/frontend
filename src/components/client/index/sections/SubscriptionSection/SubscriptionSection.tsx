import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import ArrowForwardSharp from '@mui/icons-material/ArrowForwardSharp'
import EmailIcon from '@mui/icons-material/Email'

import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import theme from 'common/theme'

import { Heading } from '../../IndexPage.styled'
import { Root, InfoText } from './SubscriptionSection.styled'
import {
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
    <Root>
      <Grid
        sx={{
          margin: '0 auto',
          textAlign: 'center',
        }}>
        <Heading variant="h4">{t('index:subscription-section.heading')}</Heading>
        <InfoText sx={{ marginBottom: theme.spacing(3), padding: 0 }}>
          {t('index:subscription-section.content')}
        </InfoText>
        {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
        <Grid
          item
          xs={12}
          mb={0.5}
          sx={{ display: 'flex', justifyContent: 'center', paddingTop: theme.spacing(2) }}>
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
        <Subtitle sx={{ display: 'block', padding: theme.spacing(1.25) }}>
          {t('campaigns:cta.subscribe-general-monthly-newsletter')}
        </Subtitle>
        <SubscribeButton onClick={() => setSubscribeOpen(true)} variant="contained">
          {t('campaigns:cta.subscribe-general-newsletter-button')}
        </SubscribeButton>
      </Grid>
    </Root>
  )
}

export default SubscriptionSection
