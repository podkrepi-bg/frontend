import { Grid, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
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
      textAlign: 'center',
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
    body: {
      maxWidth: '702px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
)
export default function Fail() {
  const classes = useStyles()
  const { t } = useTranslation('one-time-donation')

  return (
    <Grid className={classes.body}>
      <Grid
        container
        justifyContent="center"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 132.5, color: '#F44336', marginTop: '58px' } }}>
        <ErrorOutlineOutlinedIcon />
      </Grid>
      <Grid>
        <Typography className={classes.h2}>{t('fail.title')}</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>{t('fail.subtitle')}</Typography>
      </Grid>
      <Grid container display="flex" my={10}>
        <Button className={classes.buttons}>{t('fail.btn-again')}</Button>
        <Button className={classes.buttons}>{t('fail.btn-connect')}</Button>
      </Grid>
    </Grid>
  )
}
