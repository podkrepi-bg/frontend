import Head from 'next/head'
import { Box, Container, Typography } from '@material-ui/core'

import Nav from 'components/layout/Nav'

type LayoutProps = React.PropsWithChildren<{
  title?: string
}>

export default function Layout({ title, children }: LayoutProps) {
  return (
    <Container maxWidth="md">
      <Head>
        <title>{title}</title>
      </Head>
      <Box my={4}>
        <Nav />
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  )
}
