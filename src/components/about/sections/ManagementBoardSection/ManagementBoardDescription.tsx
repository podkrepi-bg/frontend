import { Button } from '@mui/material'
import { Description } from 'components/about/AboutPage.styled'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export function ManagementBoardDescritpion({ description }) {
  const { t } = useTranslation()

  const [show, setShow] = useState(false)

  return (
    <>
      <Description variant="body2" height={show ? 'auto' : '200px'}>
        {description}
      </Description>
      <div margin="0 auto" width="100%">
        <Button variant="outlined" onClick={() => setShow(!show)}>
          {show ? t('campaigns:cta.see-less') : t('campaigns:cta.see-more')}
        </Button>
      </div>
    </>
  )
}
