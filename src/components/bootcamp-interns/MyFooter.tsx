import { makeStyles } from '@mui/styles'
import { drawerWidth } from './MyDrawer'

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      background: '#f4f4f4',
      width: '98.9%',
      position: 'absolute',
      height: '60px',
      bottom: 0,
    },
    footerParagraph: {
      textAlign: 'center',
      marginTop: '20px',
      fontWeight: 'bolder',
      fontSize: '18px',
    },
  }
})

export default function MyFooter() {
  const classes = useStyles()
  console.log(classes)

  return (
    <footer className={classes.footer}>
      <p className={classes.footerParagraph}> &copy; podkrepi.bg</p>
    </footer>
  )
}
