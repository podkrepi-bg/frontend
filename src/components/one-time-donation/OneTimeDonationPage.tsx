import { Box, Grid, Theme, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import createStyles from '@mui/styles/createStyles'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    banner: {
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
      color: theme.palette.common.white,
      fontWeight: 500,
      margin: 0,
    },
    subtitle: {
      color: theme.palette.common.white,
      padding: theme.spacing(0, 4.7),
      fontSize: theme.spacing(4),
      height: theme.spacing(16),
    },
    avatarWrapper: {
      position: 'absolute',
      left: '750px',
      top: '255px',
    },
    avatar: {
      borderRadius: '50%',
      border: `10px solid ${theme.palette.common.white} !important`,
      textAlign: 'center',
    },
    infoWrapper: {
      gap: theme.spacing(2),
      display: 'grid',
    },
  }),
)

export default function OneTimeDonation() {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Grid sx={{ paddingTop: '112px' }}>
        <Image
          sizes="100%"
          objectFit="cover"
          width="1440"
          height="272"
          className={classes.banner}
          alt="The house from the offer."
          src="/img/campaign-banner.png"
        />
        <Grid className={classes.avatarWrapper}>
          <Image
            width="307"
            height="307"
            className={classes.avatar}
            alt="The house from the offer."
            src="/img/campaign-banner.png"
          />
        </Grid>
      </Grid>
      <Layout>
        <Typography variant="h1">Somthing</Typography>
      </Layout>
    </>
  )
}
