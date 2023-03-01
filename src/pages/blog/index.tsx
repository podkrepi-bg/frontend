import { GetServerSideProps } from 'next'
import * as Sentry from '@sentry/nextjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogIndexPage from 'components/client/blog/BlogIndexPage'
import { createGhostClient } from 'common/util/ghost-client'
import { isString } from 'lodash'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  try {
    const queriedPage = isString(query.page) && parseInt(query.page) > 0 ? parseInt(query.page) : 1
    const client = createGhostClient()
    const posts = await client.posts.browse({ limit: '9', page: queriedPage })
    const { pagination } = posts.meta

    return {
      props: {
        posts,
        pagination,
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    return {
      props: {
        posts: [],
        pagination: {},
        ...(await serverSideTranslations(locale ?? 'bg', ['common', 'blog'])),
      },
    }
  }
}

export default BlogIndexPage
