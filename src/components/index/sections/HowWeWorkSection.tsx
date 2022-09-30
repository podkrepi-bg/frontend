import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { Box, Grid, Hidden, Typography } from '@mui/material'

import Heading from 'components/common/Heading'

export default function HowWeWorkSection() {
  const { t, i18n } = useTranslation()

  return (
    <Grid container direction="column" component="section" sx={{ textAlign: 'center', mb: 5 }}>
      <Heading
        id="how-we-work"
        variant="h4"
        component="h2"
        linkable
        sx={(theme) => ({
          pt: 10,
          pb: 7,
          px: 2,
          color: theme.palette.primary.dark,
        })}>
        {t('index:how-we-work.heading')}
      </Heading>
      <Box sx={{ px: 3 }}>
        <Grid maxWidth="lg" margin="0 auto" item rowSpacing={10}>
          <Typography variant="subtitle1">{t('index:how-we-work.text')}</Typography>
        </Grid>
      </Box>
      <Grid item sx={{ mt: 5 }} maxWidth="md">
        <Hidden smUp>
          <Image src={`/infographic-${i18n.language}-mobile.svg`} width={320} height={1002} />
        </Hidden>
        <Hidden smDown>
          <Image src={`/infographic-${i18n.language}.svg`} width={1096} height={1114.6} />
        </Hidden>
      </Grid>
    </Grid>
  )
}
