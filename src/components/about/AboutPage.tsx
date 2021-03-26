import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'

import HowEveryThingBegin from './sections/HowEverythingBegin'
import PrinciplesThatUniteUs from './sections/PrinciplesThatUniteUs'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: { fontSize: theme.spacing(3.125), paddingBottom: theme.spacing(33.75) },
  }),
)

export default function AboutPage() {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Layout title={t('about:about.title')}>
      <Grid container>
        <Typography variant="h5" component="p" align="center" className={classes.description}>
          {t('about:about.description')}
        </Typography>
      </Grid>
      <HowEveryThingBegin />
      <PrinciplesThatUniteUs />
    </Layout>
  )
}
