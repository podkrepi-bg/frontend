import Head from 'next/head'
import { useState } from 'react'
import { Box, Container, createStyles, makeStyles, Typography } from '@material-ui/core'

import Footer from 'components/layout/Footer'
import AppNavBar from 'components/layout/AppNavBar'
import Snackbar from 'components/layout/Snackbar'

type LayoutProps = React.PropsWithChildren<{
  title?: string
}>

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
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(0),
      },
    },
  }),
)

export default function Layout({ title, children }: LayoutProps) {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)
  return (
    <Container maxWidth="md" className={classes.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      <Box pt={4} pb={20}>
        <AppNavBar navMenuToggle={navMenuToggle} />
        <div className={classes.offset} />
        {title && (
          <Typography
            paragraph
            variant="h1"
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
