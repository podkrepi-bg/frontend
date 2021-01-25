import { createStyles, makeStyles } from '@material-ui/core'
import LocaleSwitcher from './LocaleSwitcher'

const useStyles = makeStyles((theme) =>
  createStyles({
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: theme.spacing(3, 0),
    },
  }),
)

export default function Footer() {
  const styles = useStyles()
  return (
    <footer className={styles.footer}>
      <LocaleSwitcher />
    </footer>
  )
}
