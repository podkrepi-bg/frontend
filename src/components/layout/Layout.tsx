import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Container,
  ContainerProps,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core'

import Snackbar from 'components/layout/Snackbar'
import AppNavBar from 'components/layout/AppNavBar'
import MobileNav from './nav/MobileNav'
import Footer from 'components/layout/Footer'

type LayoutProps = React.PropsWithChildren<
  ContainerProps & {
    title?: string
    disableOffset?: boolean
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
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(0),
      },
    },
  }),
)

export default function Layout({
  title,
  children,
  disableOffset = false,
  maxWidth = 'md',
  ...containerProps
}: LayoutProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)
  const suffix = t('meta.title')
  const metaTitle = useMemo(() => (title ? `${title} | ${suffix}` : suffix), [title, suffix])
  return (
    <Container maxWidth="xl" disableGutters>
      <Container className={classes.layout} maxWidth={maxWidth} {...containerProps}>
        <Head>
          <title>{metaTitle}</title>
        </Head>
        <Box pt={4} pb={disableOffset ? 0 : 10}>
          <AppNavBar navMenuToggle={navMenuToggle} />
          <MobileNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {!disableOffset && <div className={classes.offset} />}
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
      </Container>
      <Footer />
    </Container>
  )
}
