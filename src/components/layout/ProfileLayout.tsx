import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, BoxProps, Container, ContainerProps, Typography } from '@mui/material'

import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import Footer from 'components/layout/Footer'
import { defaultOgImage } from 'common/routes'
import Snackbar from 'components/layout/Snackbar'
import DetailsModal from 'components/modal/DetailsModal'

import dynamic from 'next/dynamic'
const AppNavBarWithNoSSR = dynamic(() => import('components/layout/AppNavBar'), { ssr: false })

import MobileNav from './nav/MobileNav'
import ImproveThisPageTag from './ImproveThisPageTag'

type LayoutProps = React.PropsWithChildren<
  ContainerProps & {
    title?: string
    ogImage?: string
    githubUrl?: string
    figmaUrl?: string
    hideFooter?: boolean
    disableOffset?: boolean
    boxProps?: BoxProps
    metaDescription?: string
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
      [theme.breakpoints.down('lg')]: {
        marginBottom: theme.spacing(0),
      },
    },
  }),
)

export default function ProfileLayout({
  title,
  ogImage,
  children,
  maxWidth = 'lg',
  disableOffset = false,
  githubUrl,
  figmaUrl,
  hideFooter = false,
  boxProps,
  metaDescription,
  ...containerProps
}: LayoutProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)
  const suffix = t('meta.title')
  const metaTitle = useMemo(() => (title ? `${title} | ${suffix}` : suffix), [title, suffix])
  return (
    <Container maxWidth={false} disableGutters>
      <Container className={classes.layout} maxWidth={maxWidth} {...containerProps}>
        <Head>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription ?? metaTitle} />
          <meta key="og:title" property="og:title" content={metaTitle} />
          <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage} />
          <meta key="og:image:width" property="og:image:width" content="1910" />
          <meta key="og:image:height" property="og:image:height" content="1000" />
        </Head>
        <Box pt={4} pb={disableOffset ? 0 : 10} {...boxProps}>
          <AppNavBarWithNoSSR navMenuToggle={navMenuToggle} />
          <MobileNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {!disableOffset && <div className={classes.offset} />}
          <Typography
            paragraph
            variant="h2"
            component="h1"
            align="center"
            className={classes.pageTitle}>
            {title}
          </Typography>
          {children}
          <ImproveThisPageTag githubUrl={githubUrl} figmaUrl={figmaUrl} />
        </Box>
        <Snackbar />
        <DetailsModal />
      </Container>
      {!hideFooter && <Footer />}
    </Container>
  )
}
