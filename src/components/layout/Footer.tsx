import { createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      margin: theme.spacing(3, 0),
    },
  }),
)

export default function Footer() {
  const classes = useStyles()
  return <footer className={classes.footer}></footer>
}
