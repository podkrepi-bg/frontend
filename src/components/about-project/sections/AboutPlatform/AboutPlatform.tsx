import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Hidden } from '@mui/material'

import { PlatformDescriptionText, Root } from './AboutPlatform.styled'

export default function AboutPlatform() {
  const { t, i18n } = useTranslation()

  return (
    <Root>
      <PlatformDescriptionText variant="h5">
        {t('about-project:aboutPlatformDescription')}
      </PlatformDescriptionText>
      <Hidden smUp>
        {/* A11Y TODO: Render the svg without an <Image /> so screenreaders can read it out */}
        <Image
          alt="Podkrepi infographic"
          src={`/infographic-${i18n.language}-mobile.svg`}
          width={320}
          height={1002}
        />
      </Hidden>
      <Hidden smDown>
        {/* A11Y TODO: Render the svg without an <Image /> so screenreaders can read it out */}
        <Image
          alt="Podkrepi infographic"
          src={`/infographic-${i18n.language}.svg`}
          width={1096}
          height={1114.6}
        />
      </Hidden>
    </Root>
  )
}
