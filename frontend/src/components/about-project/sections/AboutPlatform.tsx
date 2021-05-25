import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { createStyles, Grid, Hidden, makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      fontSize: theme.typography.pxToRem(40),
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    content: {
      fontSize: theme.typography.pxToRem(17.6),
      marginBottom: theme.spacing(5),
    },
    graphic: {
      height: theme.spacing(27),
      width: theme.spacing(116),
    },
  }),
)

export default function AboutPlatform() {
  const { t, i18n } = useTranslation()
  const classes = useStyles()
  return (
    <Grid
      container
      spacing={5}
      direction="column"
      component="section"
      alignContent="center"
      className={classes.container}>
      <Grid item>
        <Typography variant="h5" component="p" className={classes.content}>
          {t('about-project:aboutPlatformDescription')}
        </Typography>
      </Grid>
      <Hidden smUp>
        <Image src={`/infographic-${i18n.language}-mobile.svg`} width={320} height={1002} />
      </Hidden>
      <Hidden xsDown>
        <Image src={`/infographic-${i18n.language}.svg`} width={1096} height={1114.6} />
      </Hidden>
    </Grid>
  )
}
