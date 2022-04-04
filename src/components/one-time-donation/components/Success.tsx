import { Grid, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

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

  return (
    <Grid>
      <Grid
        container
        justifyContent="center"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 132.5, color: '#4BD12A', marginTop: '58px' } }}>
        <CheckCircleOutlinedIcon />
      </Grid>
      <Grid container justifyContent="center">
        <Typography className={classes.h2}>Благодарим за доверието и подкрепата!</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>
          Вашето дарение ще помогне на [име на кампания] по-бързо да постигне своята цел!{' '}
        </Typography>
      </Grid>
      <Grid container my="72px" justifyContent="center">
        <Typography>Сподели съобщението на кампанията за да достигне повече хора:</Typography>
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
        <Button className={classes.buttons}>Генерирай Сертификат</Button>
        <Button className={classes.buttons}>Кажи ни какво мислиш </Button>
        <Button className={classes.buttons}>Oще кампании</Button>
      </Grid>
    </Grid>
  )
}
