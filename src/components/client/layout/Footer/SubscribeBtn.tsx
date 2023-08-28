import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubscribeLinkWrapper } from './Footer.styled'
import { useState } from 'react'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'
import { MarkEmailUnread } from '@mui/icons-material'

export const SubscribeBtn = () => {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <SubscribeLinkWrapper mt={2} display="flex">
      {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
      <Typography onClick={() => setSubscribeOpen(true)}>
        {t('components.footer.subscribe')}
      </Typography>
      <MarkEmailUnread onClick={() => setSubscribeOpen(true)} cursor="pointer" />
    </SubscribeLinkWrapper>
  )
}
