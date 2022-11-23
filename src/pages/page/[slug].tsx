import * as Sentry from '@sentry/nextjs'
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BlogPage from 'components/blog/BlogPage'
import { createGhostClient } from 'common/util/ghost-client'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createGhostClient()
  const pages = await client.pages.browse({
    limit: 'all',
    fields: ['slug'],
  })

  // Get the paths we want to create based on pages
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }))

  // { fallback: false } means pages not found should 404.
  return { paths, fallback: false }
}

export default BlogPage
