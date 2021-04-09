import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { Favorite } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: '#eeeeee',
      paddingTop: theme.spacing(10),
    },
    supportImageWrapper: {
      textAlign: 'center',
    },
    supportImage: {
      maxWidth: '60%',
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
      },
    },
    supportOptionsWrapper: {
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    heading: {
      marginBottom: theme.spacing(3),
      color: theme.palette.primary.dark,
      fontWeight: 500,
    },
    clickHereButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      width: theme.spacing(25),
      height: theme.spacing(6),
      margin: theme.spacing(3, 0),
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    icon: {
      fontSize: theme.typography.pxToRem(80),
      fill: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
  }),
)

export default function SupportUsSection() {
  const classes = useStyles()
  const { t } = useTranslation()

  const items = [
    t('index:support-us-section.financial-support'),
    t('index:support-us-section.labour-support'),
    t('index:support-us-section.media-support'),
    t('index:support-us-section.become-a-partner'),
  ]

  return (
    <Grid container component="section" className={classes.container}>
      <Grid item xs={12} md={6} className={classes.supportImageWrapper}>
        <img
          src="/img/support-us-image.png"
          className={classes.supportImage}
          alt="Support us image"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.supportOptionsWrapper}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('index:support-us-section.heading')}
        </Typography>
        {items.map((items, key) => (
          <Grid key={key} item>
            <Typography variant="body2">{items}</Typography>
          </Grid>
        ))}
        <Grid item>
          <LinkButton
            href={routes.support}
            variant="outlined"
            className={classes.clickHereButton}
            endIcon={<Favorite />}>
            {t('index:support-us-section.click-here-button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
