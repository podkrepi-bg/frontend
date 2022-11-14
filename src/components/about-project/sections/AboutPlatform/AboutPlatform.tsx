import React from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { Grid, Hidden, Typography } from '@mui/material'

import { Root } from './AboutPlatform.styled'

export default function AboutPlatform() {
  const { t, i18n } = useTranslation()

  return (
    <Root>
      <Grid item>
        <Typography
          variant="h5"
          component="p"
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(17.6),
            mb: 5,
          })}>
          {t('about-project:aboutPlatformDescription')}
        </Typography>
      </Grid>
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
