import { Grid, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

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
export default function Unsuccess() {
  const classes = useStyles()

  return (
    <Grid className={classes.body}>
      <Grid
        container
        justifyContent="center"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 132.5, color: '#F44336', marginTop: '58px' } }}>
        <ErrorOutlineOutlinedIcon />
      </Grid>
      <Grid>
        <Typography className={classes.h2}>За съжаление, възникна проблем!</Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Typography>
          Трансакцията не можа да бъде осъществена. Причините могат да бъдат няколко, включително
          проблем с Вашата интернет връзка.
        </Typography>
      </Grid>
      <Grid container display="flex" my={10}>
        <Button className={classes.buttons}>ОПИТАЙТЕ ПАК</Button>
        <Button className={classes.buttons}>ПИШЕТЕ НИ</Button>
      </Grid>
    </Grid>
  )
}
