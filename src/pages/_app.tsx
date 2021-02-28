import React, { useEffect } from 'react'
import '../styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { Provider as SessionProvider } from 'next-auth/client'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from 'common/theme'
import useNextLocale from 'common/useNextLocale'

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props

  useNextLocale({ i18nResources: pageProps.i18nResources })

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>Podkrepi.bg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}
