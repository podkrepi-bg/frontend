import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Grid2 } from '@mui/material'
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
      <Grid2
        sx={{
          margin: '0 auto',
          textAlign: 'center',
        }}>
        <Heading variant="h4">{t('index:subscription-section.heading')}</Heading>
        <InfoText sx={{ marginBottom: theme.spacing(3), padding: 0 }}>
          {t('index:subscription-section.content')}
        </InfoText>
        {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
        <Grid2
          mb={0.5}
          sx={{ display: 'flex', justifyContent: 'center', paddingTop: theme.spacing(2) }}
          size={12}>
          <EmailIcon
            color="primary"
            fontSize="small"
            sx={{ mr: 0.5 }}
            onClick={() => setSubscribeOpen(true)}
            cursor="pointer"
          />
          <SubscribeHeading onClick={() => setSubscribeOpen(true)}>
            {t('common:notifications.subscribe-monthly-newsletter')}
          </SubscribeHeading>
        </Grid2>
        <Subtitle sx={{ display: 'block', padding: theme.spacing(1.25) }}>
          {t('common:notifications.subscribe-general-monthly-newsletter')}
        </Subtitle>
        <SubscribeButton onClick={() => setSubscribeOpen(true)} variant="contained">
          {t('common:notifications.subscribe-general-newsletter-button')}
        </SubscribeButton>
      </Grid2>
    </Root>
  );
}

export default SubscriptionSection
