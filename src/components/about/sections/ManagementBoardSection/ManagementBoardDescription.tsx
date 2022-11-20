import { Button } from '@mui/material'
import { Description } from 'components/about/AboutPage.styled'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

export function ManagementBoardDescription({ description }) {
  const { t } = useTranslation('about')

  const [show, setShow] = useState(false)
  const [text, setText] = useState('See more')

  useEffect(() => setText(t('about.see-more')), [])

  function handleClick() {
    setShow(!show)
    const buttonText = show ? t('about.see-more') : t('about.see-less')
    setText(buttonText)
  }

  return (
    <>
      <Description variant="body2" height={show ? 'auto' : '200px'}>
        {description}
      </Description>
      <div>
        <Button variant="outlined" onClick={handleClick}>
          {text}
        </Button>
      </div>
    </>
  )
}
