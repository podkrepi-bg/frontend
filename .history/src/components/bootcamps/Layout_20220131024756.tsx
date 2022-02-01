import React from 'react'
import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import ResponsiveAppBar from './ResponsiveAppBar'
import MyDrawer from './MyDrawer'
import MyFooter from './MyFooter'
import Footer from './Footer'

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
    <>

      <Footer />
    </>
  )
}
