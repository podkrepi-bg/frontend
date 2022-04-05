import { Grid, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '32px',
      lineHeight: '120%',
      marginTop: '47.25px',
      marginBottom: '59px',
      letterSpacing: '-0.5px',
      color: '#343434',
    },
    buttons: {
      width: '309.55px',
      height: '70.69px',
      background: '#32A9FE',
      border: '0.7441px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '35.3275px',
      margin: 10,
    },
  }),
)
export default function Success() {
  const classes = useStyles()
  const { t } = useTranslation('one-time-donation')

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 132.5, color: '#4BD12A', marginTop: '58px' } }}>
        <CheckCircleOutlinedIcon />
      </Grid>
      <Grid container justifyContent="center">
        <Typography className={classes.h2}>{t('success.title')}</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>{t('success.subtitle')}</Typography>
      </Grid>
      <Grid container my="72px" justifyContent="center">
        <Typography>{t('success.share-to')}</Typography>
        <Grid
          container
          display="flex"
          justifyContent="center"
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '38px',
              color: '#909090',
              margin: 2,
            },
          }}>
          <FacebookOutlinedIcon />
          <InstagramIcon />
          <LinkedInIcon />
        </Grid>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Button className={classes.buttons}>{t('success.btn-generate')}</Button>
        <Button className={classes.buttons}>{t('success.btn-say-to-us')}</Button>
        <Button className={classes.buttons}>{t('success.btn-other-campaign')}</Button>
      </Grid>
    </Grid>
  )
}
