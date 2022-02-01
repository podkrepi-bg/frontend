import { makeStyles } from '@mui/styles'


export default function MyFooter() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <p className={classes.footerParagraph}> &copy; podkrepi.bg</p>
    </footer>
  )
}
