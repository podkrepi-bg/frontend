import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useRouter } from 'next/router'
import { i18nextInit } from '../i18n'

import theme from 'common/theme'

export default function CustomApp(props: AppProps) {
  const { Component, pageProps } = props
  const nextRouter = useRouter()

  i18nextInit(nextRouter, pageProps.i18nNamespaces)

  React.useEffect(() => {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}
