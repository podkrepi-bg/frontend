import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import Image from 'next/image'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: '#eeeeee',
      padding: theme.spacing(6, 0),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6, 0, 0),
      },
    },
    supportImage: {
      minHeight: '20rem',
      textAlign: 'center',
      position: 'relative',
    },
    supportText: {
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
      },
    },
    heading: {
      marginBottom: theme.spacing(3),
      color: theme.palette.primary.dark,
      fontWeight: 500,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(3),
      },
    },
    supportOptions: {
      [theme.breakpoints.down('md')]: {
        display: 'inline-block',
        textAlign: 'left',
      },
    },
    joinButton: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(3),
      width: theme.spacing(25),
      height: theme.spacing(6),
      marginTop: theme.spacing(3),
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
      <Grid item xs={12} md={6} className={classes.supportImage}>
        <Image
          src="/img/support-us-image.png"
          alt="Podkrepi.bg support us"
          layout="fill"
          objectFit="contain"
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.supportText}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('index:support-us-section.heading')}
        </Typography>
        <Grid className={classes.supportOptions}>
          {items.map((items, key) => (
            <Grid key={key} item>
              <Typography variant="body2">{items}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <LinkButton
            href={routes.support}
            variant="outlined"
            className={classes.joinButton}
            endIcon={<Favorite />}>
            {t('index:support-us-section.click-here-button')}
          </LinkButton>
        </Grid>
      </Grid>
    </Grid>
  )
}
