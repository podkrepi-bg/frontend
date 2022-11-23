import * as Sentry from '@sentry/nextjs'
import { GetStaticPaths, GetStaticProps } from 'next'
import BlogPostPage from 'components/blog/BlogPostPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { createGhostClient } from 'common/util/ghost-client'

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  if (typeof params?.slug !== 'string') return { notFound: true }

  try {
    const client = createGhostClient()
    const post = await client.posts.read({ slug: params.slug })

    if (!post) {
      return { notFound: true }
    }
    return {
      props: {
        post,
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
  const posts = await client.posts.browse({
    limit: 'all',
    fields: ['slug'],
  })

  // Get the paths we want to create based on posts
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))

  // { fallback: false } means posts not found should 404.
  return { paths, fallback: false }
}

export default BlogPostPage
