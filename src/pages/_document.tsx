/* eslint-disable @next/next/no-document-import-in-page */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

import theme from 'common/theme'
import FaviconMetadata from 'components/common/brand/FaviconMetadata'

import {
  DocumentHeadTags,
  createEmotionCache,
  documentGetInitialProps,
} from '@mui/material-nextjs/v15-pagesRouter'

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[]
}

export default function MyDocument(props: MyDocumentProps) {
  return (
    <Html>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />

        <FaviconMetadata />
        {/* Inject MUI styles first to match with the prepend: true configuration. */}
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createEmotionCache(),
  })
  return finalProps
}
