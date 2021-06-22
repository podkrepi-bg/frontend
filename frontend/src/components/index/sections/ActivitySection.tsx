import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Heading from 'components/common/Heading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
      color: theme.palette.primary.dark,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
    graphic: {
      marginTop: theme.spacing(5),
    },
  }),
)

export default function ActivitySection() {
  const classes = useStyles()
  const { t, i18n } = useTranslation()

  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <Heading id="what-we-do" variant="h5" component="h2" className={classes.heading} linkable>
        {t('index:activity-section.heading')}
      </Heading>
      <Grid item>
        <Heading variant="body2">{t('index:activity-section.content')}</Heading>
      </Grid>
      <Grid item className={classes.graphic}>
        <Hidden smUp>
          <Image src={`/infographic-${i18n.language}-mobile.svg`} width={320} height={1002} />
        </Hidden>
        <Hidden xsDown>
          <Image src={`/infographic-${i18n.language}.svg`} width={1096} height={1114.6} />
        </Hidden>
      </Grid>
    </Grid>
  )
}
