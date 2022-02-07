import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

// import MyFooter from './MyFooter'
// import ResponsiveAppBar from './ResponsiveAppBar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
    },
    page: {
      width: '100%',
      padding: theme.spacing(3),
    },
  }),
)

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.page}>{children}</div>
    </div>
  )
}
