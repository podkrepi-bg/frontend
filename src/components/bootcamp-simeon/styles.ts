import { makeStyles } from '@mui/styles'

const drawerWidth = 194

const useStyles = makeStyles({
  active: {
    border: '1px solid lightblue',
    borderRadius: '25px',
    margin: '10px 20px',
    width: '80%',
    textAlign: 'left',
  },
  settings: {
    position: 'absolute',
    bottom: '4.5rem',
  },
  text: {
    position: 'static',
    left: '30.38%',
    right: '0%',
    top: '0%',
    bottom: '0%',

    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',

    letterSpacing: '0.4px',
    textTransform: 'capitalize',

    flex: 'none',
    order: '1',
    flexGrow: '0',
    margin: '0px 8px',
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0px 0px 0px 4px',
    position: 'static',
    width: '36px',
    height: '32px',
  },
  logo: {
    position: 'absolute',
  },
})

export { drawerWidth, useStyles as styles }
