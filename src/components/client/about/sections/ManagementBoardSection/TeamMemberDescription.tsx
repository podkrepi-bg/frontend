import { useState } from 'react'

import { useTranslation } from 'next-i18next'

import theme from 'common/theme'

import { ShowMoreButton, Description } from './ManagementBoardsection.styled'

type Props = {
  description: string
}
export function TeamMemberDescription({ description }: Props) {
  const { t } = useTranslation('about')

  const [show, setShow] = useState(false)

  return (
    <>
      <Description variant="body2" height={show ? 'auto' : theme.spacing(25)}>
        {description}
      </Description>
      <ShowMoreButton onClick={() => setShow(!show)}>
        {show ? t('about.see-less') : t('about.see-more')}
      </ShowMoreButton>
    </>
  )
}
