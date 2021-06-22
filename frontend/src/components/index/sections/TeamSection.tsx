import { useTranslation } from 'next-i18next'
import { Grid } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import DiscordImage from 'components/about/DiscordImage'
import Heading from 'components/common/Heading'

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(7),
      color: theme.palette.primary.dark,
      fontWeight: 500,
    },
    container: {
      marginBottom: theme.spacing(12),
      textAlign: 'center',
    },
  }),
)

export default function TeamSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      component="section"
      className={classes.container}>
      <Heading id="who-we-are" variant="h5" component="h2" className={classes.heading} linkable>
        {t('index:team-section.heading')}
      </Heading>
      <Grid container>
        <Grid item>
          <Heading variant="body2">{t('index:team-section.content')}</Heading>
        </Grid>
        <Grid item>
          <DiscordImage />
        </Grid>
      </Grid>
    </Grid>
  )
}
