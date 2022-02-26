import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import DiscordImage from '../DiscordImage'
import Heading from 'components/common/Heading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.dark,
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
  }),
)

export default function HowEverythingBegin() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Grid container alignItems="center" spacing={4}>
      <Grid xs={12} item>
        <Heading
          id="principles-that-unite-us"
          variant="h4"
          component="h1"
          align="center"
          className={classes.title}
          linkable>
          {t('about:howEverythingBegin.title')}
        </Heading>
      </Grid>
      <Grid item>
        <Typography variant="body1" paragraph>
          {t('about:howEverythingBegin.volunteers')}
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <DiscordImage />
      </Grid>
    </Grid>
  )
}
