import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Hidden } from '@mui/material'

import { Root } from './HowWeWorkSection.styled'
import { Heading, InfoText } from 'components/index/IndexPage.styled'

export default function HowWeWorkSection() {
  const { t, i18n } = useTranslation('index')

  const mobileInfographicPath = `/infographic-${i18n.language}-mobile.svg`
  const desktopInfographicPath = `/infographic-${i18n.language}.svg`

  return (
    <Root>
      <Heading variant="h4">{t('how-we-work.heading')}</Heading>
      <InfoText maxWidth="lg">{t('how-we-work.text')}</InfoText>
      <Grid>
        <Hidden smUp>
          <Image src={mobileInfographicPath} width={320} height={1002} />
        </Hidden>
        <Hidden smDown>
          <Image src={desktopInfographicPath} width={1096} height={1114.6} />
        </Hidden>
      </Grid>
    </Root>
  )
}
