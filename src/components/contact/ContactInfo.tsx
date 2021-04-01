import { Grid, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import MailIcon from './icons/MailIcon'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(7),
    },
    subtitle: {
      width: '100%',
      textAlign: 'center',
      marginBottom: theme.spacing(5),
    },
    contact: {
      display: 'flex',
      alignItems: 'center',
    },
    contactIcon: {
      fontSize: theme.typography.pxToRem(64),
      fill: theme.palette.primary.main,
      stroke: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
    contactText: {
      color: theme.palette.primary.dark,
    },
  }),
)

export default function ActivitySection() {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Grid container component="section">
      <Typography variant="h6" component="p" className={classes.subtitle}>
        {t('contact:subtitle')}
      </Typography>
      <Grid container justify="center" className={classes.container}>
        <Grid item className={classes.contact}>
          <MailIcon className={classes.contactIcon} />
          <Typography variant="body2" className={classes.contactText}>
            {t('contact:email')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
