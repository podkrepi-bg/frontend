import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'

import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import { SubscriptionTitle } from './Footer.styled'

export default function Subscription() {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <Grid item xs={12} display="flex">
      {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
      <EmailIcon
        color="primary"
        fontSize="small"
        sx={{ mr: 0.5 }}
        onClick={() => setSubscribeOpen(true)}
        cursor="pointer"
      />
      <SubscriptionTitle onClick={() => setSubscribeOpen(true)}>
        {t('campaigns:cta.subscribeFooter')}
      </SubscriptionTitle>
    </Grid>
  )
}
