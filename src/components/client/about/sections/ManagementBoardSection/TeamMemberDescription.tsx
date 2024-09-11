import { useState, useEffect, useRef } from 'react'

import { useTranslation } from 'next-i18next'

import theme from 'common/theme'

import { ShowMoreButton, Description } from './ManagementBoardsection.styled'

type Props = {
  description: string
}

export function TeamMemberDescription({ description }: Props) {
  const { t } = useTranslation('about')
  const [show, setShow] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const descriptionRef = useRef<HTMLDivElement | null>(null)

  // Check if the content overflows the specified height
  useEffect(() => {
    if (descriptionRef.current) {
      const elementHeight = descriptionRef.current.scrollHeight
      const maxHeight = parseFloat(theme.spacing(23).toString().replace('px', ''))
      setIsOverflowing(elementHeight >= maxHeight)
    }
  }, [description])

  return (
    <>
      <Description
        ref={descriptionRef}
        variant="body2"
        maxHeight={show ? 'auto' : theme.spacing(23)}>
        {description}
      </Description>

      {isOverflowing && (
        <ShowMoreButton onClick={() => setShow(!show)}>
          {show ? t('about.see-less') : t('about.see-more')}
        </ShowMoreButton>
      )}
    </>
  )
}
