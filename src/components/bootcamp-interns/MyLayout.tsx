import React from 'react'
import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ResponsiveAppBar from './ResponsiveAppBar'
import MyDrawer from './MyDrawer'
import MyFooter from './MyFooter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '100%',
      marginTop: theme.spacing(3),
      padding: theme.spacing(0, 2),
    },
    page: {
      background: '#f9f9f9',
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
      <MyDrawer />
      <div className={classes.page}>{props.children}</div>
      <MyFooter />
    </div>
  )
}
