import { GetStaticProps } from 'next'
import * as Sentry from '@sentry/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogIndexPage from 'components/blog/BlogIndexPage'
import { createGhostClient } from 'common/util/ghost-client'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const client = createGhostClient()
    const posts = await client.posts.browse()

    return {
      props: {
        posts,
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    return {
      props: {
        posts: [],
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  }
}

export default BlogIndexPage
