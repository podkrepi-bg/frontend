import Head from 'next/head'
import { Box, Container, createStyles, makeStyles, Typography } from '@material-ui/core'

import Nav from 'components/layout/Nav'
import Footer from 'components/layout/Footer'
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
  }),
)

export default function Layout({ title, children }: LayoutProps) {
  const styles = useStyles()
  return (
    <Container maxWidth="md" className={styles.layout}>
      <Head>
        <title>{title}</title>
      </Head>
      <Box py={4} pb={8}>
        <Nav />
        {title && (
          <Typography
            className={styles.pageTitle}
            variant="h3"
            component="h1"
            align="center"
            paragraph>
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
