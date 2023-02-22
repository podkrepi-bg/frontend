import * as Sentry from '@sentry/nextjs'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogPage from 'components/client/blog/BlogPage'
import { createGhostClient } from 'common/util/ghost-client'

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  if (typeof params?.slug !== 'string') return { notFound: true }

  try {
    const client = createGhostClient()
    const page = await client.pages.read({ slug: params.slug })
    if (!page) {
      return { notFound: true }
    }
    return {
      props: {
        page,
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    return { notFound: true }
  }
}

export default BlogPage
