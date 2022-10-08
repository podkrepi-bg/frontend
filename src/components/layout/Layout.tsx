import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, BoxProps, Container, ContainerProps, Typography } from '@mui/material'

import Footer from 'components/layout/Footer'
import { defaultOgImage } from 'common/routes'
import Snackbar from 'components/layout/Snackbar'
import DetailsModal from 'components/modal/DetailsModal'

import AppNavBar from './AppNavBar'
import MobileNav from './nav/MobileNav'

const createPageTitle = (suffix: string, title?: string) => {
  if (title) {
    return `${title} | ${suffix}`
  }
  return suffix
}

type LayoutProps = React.PropsWithChildren<
  ContainerProps & {
    title?: string
    ogImage?: string
    githubUrl?: string
    figmaUrl?: string
    hideFooter?: boolean
    disableOffset?: boolean
    boxProps?: BoxProps
    metaTitle?: string
    metaDescription?: string
    profilePage?: boolean
  }
>

export default function Layout({
  title,
  ogImage,
  children,
  maxWidth = 'lg',
  disableOffset = false,
  githubUrl,
  figmaUrl,
  hideFooter = false,
  boxProps,
  metaTitle,
  metaDescription,
  profilePage = false,
  ...containerProps
}: LayoutProps) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navMenuToggle = () => setMobileOpen(!mobileOpen)
  const pageTitle = useMemo(
    () => createPageTitle(t('meta.title'), metaTitle ?? title),
    [metaTitle, title],
  )

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ backgroundColor: profilePage ? '#E9F6FF' : '' }}>
      <Container
        sx={{ position: 'relative', minHeight: '100vh' }}
        maxWidth={maxWidth}
        {...containerProps}>
        <Head>
          <title>{pageTitle}</title>
          <meta name="description" content={metaDescription ?? pageTitle} />
          <meta name="og:description" content={metaDescription ?? pageTitle} />
          <meta property="og:type" content="article" />
          <meta property="og:locale" content="bg_BG" />
          {/* TODO: think of how to make campaign level localization */}
          <meta key="og:title" property="og:title" content={title} />
          <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage} />
          <meta key="og:image:width" property="og:image:width" content="1640" />
          <meta key="og:image:height" property="og:image:height" content="624" />
        </Head>
        <Box pt={4} pb={disableOffset ? 0 : 10} {...boxProps}>
          <AppNavBar navMenuToggle={navMenuToggle} />
          <MobileNav mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {!disableOffset && (
            <Box sx={(theme) => ({ ...theme.mixins.toolbar, mb: { xs: 0, md: 3, lg: 6 } })} />
          )}
          {title && !disableOffset && (
            <Typography paragraph variant="h2" component="h1" align="center" sx={{ p: 4 }}>
              {title}
            </Typography>
          )}
          {children}
        </Box>
        <Snackbar />
        <DetailsModal />
      </Container>
      {!hideFooter && <Footer />}
    </Container>
  )
}
