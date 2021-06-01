import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'

import DiscordImage from '../DiscordImage'

export default function HowEverythingBegin() {
  const { t } = useTranslation()
  return (
    <Grid container alignItems="center" spacing={4}>
      <Grid item>
        <Typography variant="body1" paragraph>
          {t('about:howEverythingBegin.volunteers')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about:howEverythingBegin.vision')}
        </Typography>
        <Typography variant="body1" paragraph>
          {t('about:howEverythingBegin.mission')}
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <DiscordImage />
      </Grid>
    </Grid>
  )
}
