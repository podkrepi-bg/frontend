import { Box, Checkbox, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Tab from './Tab'

const useStyles = makeStyles({
  thinFont: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '123.5%',
    letterSpacing: '0.25px',
    color: '#000000',
  },
  h3: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '25px',
    lineHeight: '116.7%',
  },
})

function DonationTab(props: any) {
  const { value, index } = props
  const classes = useStyles()

  return (
    <Tab value={value} index={index}>
      <h2>Абонамент месечни дарения</h2>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            backgroundColor: '#EEEEEE',
            flexGrow: 1,
            marginRight: '10px',
            padding: '10px',
          }}>
          <h3 style={{ fontSize: '16px', margin: 0 }}>Дарения</h3>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 className={classes.thinFont}>Онлайн дарения</h4>
            <p style={{ fontSize: '22px' }}>0.00 лв.</p>
          </Box>
          <p>Към момента няма направени дарения</p>
          <hr></hr>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 className={classes.thinFont}>Тотал онлайн дарения</h4>
            <p style={{ fontSize: '22px' }}>0.00 лв.</p>
          </Box>
          <hr></hr>
        </Box>
        <Box sx={{ backgroundColor: '#C4C4C4', padding: '10px', position: 'relative' }}>
          <h2>Бъди промяната</h2>
          <h3>помогни на хора в нужда</h3>
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            sx={{ position: 'absolute', bottom: '35px' }}>
            Дари сега ❤️
          </Button>
        </Box>
      </Box>
      <h2>История на даренията</h2>
      <Box
        sx={{
          backgroundColor: '#EEEEEE',
          flexGrow: 1,
          marginRight: '10px',
          padding: '10px',
        }}>
        <h3 className={classes.thinFont}>Онлайн дарения</h3>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <span className={classes.thinFont}>Покажи:</span>
          <Box>
            <Checkbox defaultChecked />
            <span className={classes.thinFont}>еднократни</span>
          </Box>
          <Box>
            <Checkbox defaultChecked />
            <span className={classes.thinFont}>месечни</span>
          </Box>
          <span className={classes.thinFont}>възможност за търсене по по дата</span>
        </Box>
        <h3 className={classes.h3}>Към момента няма направени дарения</h3>
      </Box>
    </Tab>
  )
}

export default DonationTab
