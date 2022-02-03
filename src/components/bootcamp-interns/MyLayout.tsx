import React from 'react'
import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ResponsiveAppBar from './ResponsiveAppBar'
import MyFooter from './MyFooter'
import SnackBar from '../bootcamp-interns/Snackbar'
import { DrawerContext } from 'context/SwipeableDrawerContext'
import { useContext } from 'react'

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

  const { notificationsOpen }: any = useContext(DrawerContext)

  return (
    <div className={classes.root}>
      <ResponsiveAppBar />
      <div className={classes.page}>{props.children}</div>
      {notificationsOpen && <SnackBar></SnackBar>}
      <MyFooter />
    </div>
  )
}
