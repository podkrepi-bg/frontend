import { Button } from '@mui/material'
import { Description } from 'components/about/AboutPage.styled'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

type Props = {
  description: string
}
export function ManagementBoardDescription({ description }: Props) {
  const { t } = useTranslation('about')

  const [show, setShow] = useState(false)

  return (
    <>
      <Description variant="body2" height={show ? 'auto' : '200px'}>
        {description}
      </Description>
      <div>
        <Button variant="outlined" onClick={() => setShow(!show)}>
          {show ? t('about.see-less') : t('about.see-more')}
        </Button>
      </div>
    </>
  )
}
