import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { SubscribeBtnWrapper } from './Footer.styled'
import { useState } from 'react'
import RenderSubscribeModal from 'components/client/notifications/GeneralSubscribeModal'

export const SubscribeBtn = () => {
  const { t } = useTranslation()
  const [subscribeIsOpen, setSubscribeOpen] = useState(false)

  return (
    <SubscribeBtnWrapper mt={2}>
      {subscribeIsOpen && <RenderSubscribeModal setOpen={setSubscribeOpen} />}
      <Button onClick={() => setSubscribeOpen(true)}>{t('components.footer.subscribe')}</Button>
    </SubscribeBtnWrapper>
  )
}
