import { Collapse, Grid, List, Divider, Typography, Button } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import RadioGroupFormik from './RadioGroupFormik'
import { useField } from 'formik'

const useStyles = makeStyles(() =>
  createStyles({
    h2: {
      fontFamily: 'Montserrat',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '35px',
      lineHeight: '120%',
      marginTop: '58px',
      marginBottom: '59px',
      letterSpacing: '-0.5px',
      color: '#343434',
    },
    divider: {
      border: '1px solid #000000',
    },
    uncheked: {
      width: '284px',
      height: '75px',
      background: '#FFFFFF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    checked: {
      width: '284px',
      height: '75px',
      background: '#D2F0FF',
      border: '1px solid #000000',
      boxSizing: 'border-box',
      borderRadius: '37.5px',
      marginBottom: '33px',
    },
    body: {
      maxWidth: '539px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
)
const options = ['Карта', 'Банков превод']

export default function ThirdStep() {
  const classes = useStyles()
  const [field] = useField('payment')

  return (
    <Grid className={classes.body}>
      <Grid>
        <Typography className={classes.h2}>Как желаете да дарите?</Typography>
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <RadioGroupFormik name="payment" options={options} />
      </Grid>
      <Grid>
        <Collapse in={field.value === 'Банков превод'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Typography my={2} mx={10} variant="h6">
              Детайли на банкова сметка:
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Сдружение Подкрепи БГ</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Уникредит Булбанк</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>IBAN: BG66 UNCR 7000 1524 3490 32</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Typography my={2} mx={10} variant="h6">
              Основание за дарение запишете
            </Typography>
            <Divider className={classes.divider} />
            <Grid mx={11} my={3} container display="flex" justifyContent="space-between" xs={9}>
              <Typography>Campaing Name</Typography>
              <Button variant="contained" color="info">
                Копирай
              </Button>
            </Grid>
            <Typography mx={10}>
              Ако не напишете правилно основанието, може да не разпределим парите по предназначение
            </Typography>
          </List>
        </Collapse>
      </Grid>
    </Grid>
  )
}
