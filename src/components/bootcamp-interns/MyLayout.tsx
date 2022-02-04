import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import MyFooter from './MyFooter'
import ResponsiveAppBar from './ResponsiveAppBar'

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

export default function MyLayout(props: any) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ResponsiveAppBar />
      <div className={classes.page}>{props.children}</div>
      <MyFooter />
    </div>
  )
}
