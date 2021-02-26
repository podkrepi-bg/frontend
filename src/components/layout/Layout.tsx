import Head from 'next/head'
import { useState } from 'react'
import {
  Box,
  Container,
  ContainerProps,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core'

import Footer from 'components/layout/Footer'
import Snackbar from 'components/layout/Snackbar'
import AppNavBar from 'components/layout/AppNavBar'

import MobileNav from './nav/MobileNav'

type LayoutProps = React.PropsWithChildren<
  ContainerProps & {
    title?: string
  }
>

const useStyles = makeStyles((theme) =>
  createStyles({
    layout: {
      position: 'relative',
      minHeight: '100vh',
    },
    pageTitle: {
      padding: theme.spacing(4),
    },
    offset: {
      ...theme.mixins.toolbar,
      marginBottom: theme.spacing(0),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(0),
      },
    },
  }),
)

export default function Layout({
  title,
  children,
  maxWidth = 'md',
  ...containerProps
}: LayoutProps) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)
  return (
    <Container className={classes.layout} maxWidth={maxWidth} {...containerProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <Box pt={4} pb={20}>
        <AppNavBar navMenuToggle={navMenuToggle} />
        <MobileNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className={classes.offset} />
        {title && (
          <Typography
            paragraph
            variant="h2"
            component="h1"
            align="center"
            className={classes.pageTitle}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
      <Snackbar />
      <Footer />
    </Container>
  )
}
