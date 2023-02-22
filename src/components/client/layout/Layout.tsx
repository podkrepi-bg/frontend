import Head from 'next/head'
import Script from 'next/script'
import { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, BoxProps, Container, ContainerProps, Typography } from '@mui/material'

import Footer from 'components/client/layout/Footer/Footer'
import Snackbar from 'components/client/layout/Snackbar'
import { defaultOgImage } from 'common/routes'
import DetailsModal from 'components/admin/modal/DetailsModal'

import AppNavBar from './AppNavBar'
import MobileNav from './nav/MobileNav/MobileNav'

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
    hideFooter?: boolean
    disableOffset?: boolean
    boxProps?: BoxProps
    metaTitle?: string
    metaDescription?: string
    profilePage?: boolean
    canonicalUrl?: string
    prevPage?: string
    nextPage?: string
  }
>

export default function Layout({
  title,
  ogImage,
  children,
  maxWidth = 'lg',
  disableOffset = false,
  hideFooter = false,
  canonicalUrl,
  prevPage,
  nextPage,
  boxProps,
  metaTitle,
  metaDescription,
  profilePage = false,
  ...containerProps
}: LayoutProps) {
  const { t, i18n } = useTranslation()
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
          {canonicalUrl && (
            <>
              <link rel="canonical" href={canonicalUrl} />
              <meta property="og:url" content={canonicalUrl} />
            </>
          )}
          {prevPage && (
            <>
              <link rel="prev" href={prevPage} />
            </>
          )}
          {nextPage && (
            <>
              <link rel="next" href={nextPage} />
            </>
          )}
          <meta property="og:type" content="article" />
          <meta property="og:locale" content={i18n.language === 'bg' ? 'bg_BG' : 'en_US'} />
          {/* TODO: think of how to make campaign level localization */}
          <meta key="og:title" property="og:title" content={pageTitle} />
          <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage.src} />
          {!ogImage && (
            <meta key="og:image:width" property="og:image:width" content={defaultOgImage.width} />
          )}
          {!ogImage && (
            <meta
              key="og:image:height"
              property="og:image:height"
              content={defaultOgImage.height}
            />
          )}
        </Head>
        <Script async src="https://www.googleoptimize.com/optimize.js?id=OPT-W89QK8X" />
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
