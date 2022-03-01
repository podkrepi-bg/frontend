import { makeStyles } from '@mui/styles'

const drawerWidth = 194

const useStyles = makeStyles({
  active: {
    // background: '#CCFFFF',
    border: '1px solid lightblue',
    borderRadius: '25px',
    margin: '10px 20px',
    width: '80%',
    textAlign: 'left',
  },
  settings: {
    position: 'absolute',
    // top: '100%',
    bottom: '4.5rem',
    // background: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    position: 'static',
    left: '30.38%',
    right: '0%',
    top: '0%',
    bottom: '0%',

    /* components/button-medium */
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',

    /* identical to box height, or 150% */
    letterSpacing: '0.4px',
    textTransform: 'capitalize',

    /* Inside auto layout */
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
    // left: '0px',
    // top: '0px',
    // background: 'rgba(74, 195, 255, 0.26)',
    // borderRadius: '100px',
    // flex: 'none',
    // order: '0',
    // flexGrow: '0',
    // margin: '8px 0px',
  },
  logo: {
    position: 'absolute',
  },
})

export { drawerWidth, useStyles as styles }
