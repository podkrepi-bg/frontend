import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: '#eeeeee',
      paddingTop: theme.spacing(10),
    },
    heading: {
      marginBottom: theme.spacing(4),
      color: theme.palette.primary.dark,
      fontWeight: 500,
    },
    icon: {
      fontSize: theme.typography.pxToRem(80),
      fill: theme.palette.primary.main,
      padding: theme.spacing(1),
    },
    supportOptionsWrapper: {
      textAlign: 'center',
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
      },
    },
    supportImage: {
      width: '40%',
      height: '100%',
    },
    clickHereButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      padding: theme.spacing(1, 5),
      margin: theme.spacing(4, 0),
      fontWeight: 500,
      fontSize: theme.typography.pxToRem(15),
      '&::after': {
        content: '"❤"',
        color: theme.palette.primary.dark,
        paddingLeft: theme.spacing(0.5),
        fontSize: theme.typography.pxToRem(11),
        height: theme.spacing(2),
      },
      '&:hover': {
        '&::after': {
          color: theme.palette.common.white,
        },
      },
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
      <Grid item xs={12} sm={6} className={classes.supportOptionsWrapper}>
        <img
          src="/img/support-us-image.png"
          className={classes.supportImage}
          alt="Support us image"
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.supportOptionsWrapper}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('index:support-us-section.heading')}
        </Typography>
        {items.map((items, key) => (
          <Grid key={key} item>
            <Typography variant="body2">{items}</Typography>
          </Grid>
        ))}
        <Grid item>
          <LinkButton href={routes.support} variant="outlined" className={classes.clickHereButton}>
            {t('index:support-us-section.click-here-button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
