import React from 'react'
import { Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import Footer from './Footer'
import Drawer from './Drawer'
import BootcampCreateForm from '../BootcampCreateForm'

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

export default function Layout(props: any) {
  const classes = useStyles()

  return (
    <div>
      <Drawer />

      <Footer />
    </div>
  )
}
